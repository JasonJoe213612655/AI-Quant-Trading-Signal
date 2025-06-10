from typing import Dict, Any, List, Optional
import logging
import os
from dotenv import load_dotenv
import requests
from datetime import datetime, timedelta
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
import json
import yfinance as yf
from bs4 import BeautifulSoup
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain_core.tools import tool

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get API key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    logger.error("OPENAI_API_KEY not found, please make sure your .env file is configured correctly")
    raise ValueError("OPENAI_API_KEY not found, please make sure your .env file is configured correctly")

class NewsArticle(BaseModel):
    """News article model"""
    title: str = Field(description="News title")
    source: str = Field(description="News source")
    date: str = Field(description="Publication date")
    summary: str = Field(description="News summary")
    url: str = Field(description="News link")

class SentimentAnalysis(BaseModel):
    """Market sentiment analysis result model"""
    overall_sentiment: str = Field(description="Overall market sentiment: positive/neutral/negative")
    sentiment_score: float = Field(description="Sentiment score, range -1 to 1")
    key_points: List[str] = Field(description="Key points analysis")
    confidence: float = Field(description="Analysis confidence, range 0 to 1")
    news_summary: str = Field(description="News content summary")

class SentimentAgent:
    """Market sentiment analysis AI agent"""
    
    def __init__(self, model_name: str = "gpt-4o"):
        """
        Initialize the market sentiment analysis AI agent
        
        Args:
            model_name: The name of the model used
        """
        self.model = ChatOpenAI(
            model_name=model_name,
            temperature=0,
            openai_api_key=OPENAI_API_KEY
        )
        self._setup_prompts()
        self.vector_store = None
        
    def _setup_prompts(self) -> None:
        """Set the prompt template"""
        # News analysis prompt template
        self.news_analysis_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a professional market sentiment analyst. Please combine the following background material and news content to extract key information and evaluate market sentiment.
            Output includes:
            1. Overall market sentiment (positive/neutral/negative)
            2. Sentiment score (-1 to 1)
            3. Key points analysis (list form)
            4. Analysis confidence (0 to 1)
            5. News content summary (within 200 words)"""),
            ("user", "【Background information】\n{extra_context}\n\n【News content】\n{news_content}")
        ])
        
        # Output parser
        self.output_parser = PydanticOutputParser(pydantic_object=SentimentAnalysis)
        
    def _fetch_news(self, symbol: str, days: int = 7) -> List[Dict[str, Any]]:
        """
        Get asset-related news
        
        Args:
            symbol: Asset code
            days: Get the news of the past few days
            
        Returns:
            News list
        """
        try:
            # Get news using yfinance
            ticker = yf.Ticker(symbol)
            news = ticker.news
            
            # Format news data
            formatted_articles = []
            for article in news:
                # Convert timestamp to date string
                date = datetime.fromtimestamp(article['providerPublishTime']).strftime('%Y-%m-%d %H:%M:%S')
                url = article['link']
                
                # Get the full text content
                full_text = ""
                try:
                    r = requests.get(url, timeout=5)
                    soup = BeautifulSoup(r.text, "html.parser")
                    paragraphs = soup.find_all("p")
                    full_text = "\n".join(p.get_text() for p in paragraphs if p.get_text())
                except Exception as e:
                    logger.warning(f"Failed to fetch body: {e}")   

                formatted_articles.append({
                    "title": article['title'],
                    "source": article['publisher'],
                    "date": date,
                    "summary": article.get('summary', ''),
                    "url": article['link'],
                    "content": full_text
                })
                
            return formatted_articles
            
        except Exception as e:
            logger.error(f"Error getting news: {str(e)}")
            return []
            
    def _analyze_news(self, articles: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Analyze news content
        
        Args:
            articles: News article list
            
        Returns:
            Analysis result
        """
        try:
            # Merge news content
            news_content = "\n\n".join([
                f"Title: {article['title']}\n"
                f"Source: {article['source']}\n"
                f"Date: {article['date']}\n"
                f"Summary: {article['summary']}\n"
                f"Content: {article['content'][:500]}\n"
                for article in articles
            ])
            # Initialize vector store
            if not self.vector_store:
                docs = [
                    Document(page_content=article["content"] or article["summary"], metadata={"title": article["title"]})
                    for article in articles
                ]
                splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
                chunks = splitter.split_documents(docs)
                self.vector_store = FAISS.from_documents(chunks, OpenAIEmbeddings())

            query = articles[0]["title"] + " " + articles[0]["summary"]
            results = self.vector_store.similarity_search(query, k=3)
            extra_context = "\n\n".join([doc.page_content for doc in results])            
            
            # Call model analysis
            response = self.model.predict(
                self.news_analysis_prompt.format(
                    news_content=news_content,
                    extra_context=extra_context)
            )
            
            # Parse output
            analysis = self.output_parser.parse(response)
            
            return {
                "overall_sentiment": analysis.overall_sentiment,
                "sentiment_score": analysis.sentiment_score,
                "key_points": analysis.key_points,
                "confidence": analysis.confidence,
                "news_summary": analysis.news_summary,
                "articles": articles
            }
            
        except Exception as e:
            logger.error(f"Error analyzing news: {str(e)}")
            return {
                "error": str(e)
            }
    @tool("analyze_market_sentiment")            
    def analyze_market_sentiment(self, symbol: str) -> Dict[str, Any]:
        """
        Analyze market sentiment based on news content of a specific asset
        """
        try:
            logger.info(f"Starting to analyze market sentiment for {symbol}")
            
            # Get news
            articles = self._fetch_news(symbol)
            if not articles:
                logger.warning(f"No news found for {symbol}")
                return {
                    "error": "No news found"
                }
                
            # Analyze news
            result = self._analyze_news(articles)
            
            logger.info(f"Market sentiment analysis for {symbol} completed")
            return result
            
        except Exception as e:
            logger.error(f"Error analyzing market sentiment: {str(e)}")
            return {
                "error": str(e)
            } 