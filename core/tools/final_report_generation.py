from typing import Dict, Any, List, Optional
import logging
import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from datetime import datetime
from langchain_core.tools import tool
import json

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

class TradingReport(BaseModel):
    """Trading report model"""
    summary: str = Field(description="Overall analysis summary")
    market_sentiment: Dict[str, Any] = Field(description="Market sentiment analysis")
    quant_analysis: Dict[str, Any] = Field(description="Quantitative analysis results")
    recommendations: List[str] = Field(description="Trading recommendations")
    risk_assessment: Dict[str, Any] = Field(description="Risk assessment")
    confidence_score: float = Field(description="Analysis confidence")
    generated_at: str = Field(description="Report generation time")

class ReportAgent:
    """Trading analysis report generation AI agent"""
    
    def __init__(self, model_name: str = "gpt-4o"):
        """
        Initialize the report generation AI agent
        
        Args:
            model_name: The name of the model to use
        """
        self.model = ChatOpenAI(
            model_name=model_name,
            temperature=0,
            openai_api_key=OPENAI_API_KEY
        )
        self._setup_prompts()
        
    def _setup_prompts(self) -> None:
        """Set up the prompt template"""
        # Report generation prompt template
        self.report_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a professional quantitative trading analyst. Please generate a comprehensive analysis report based on the provided original quantitative analysis and market sentiment data.

            The input data will include two main parts:
            1. quant_analysis: Contains strategy performance metrics, trading statistics, risk assessment, etc.
            2. market_sentiment: Contains market sentiment analysis and news summary.

            Please analyze these original data carefully and generate a JSON format report containing the following fields:
            {
                "summary": "Overall analysis summary, including comprehensive evaluation of strategy performance and market environment",
                "market_sentiment": {
                    "overall_sentiment": "Evaluation of market sentiment based on original data",
                    "key_factors": ["List of key factors affecting market sentiment"],
                    "news_impact": "Analysis of the impact of important news events on the market"
                },
                "quant_analysis": {
                    "strategy_performance": "Evaluation of the overall performance of the strategy",
                    "key_metrics": "Analysis and interpretation of key metrics",
                    "risk_return": "Analysis of risk and return characteristics"
                },
                "recommendations": [
                    "Specific trading recommendations based on the analysis results"
                ],
                "risk_assessment": {
                    "market_risk": "Current market risk analysis",
                    "strategy_risk": "Strategy risk analysis",
                    "risk_mitigation": "Risk mitigation suggestions"
                },
                "confidence_score": 0.95  // Overall analysis confidence
            }
            
            Requirements:
            1. Strictly follow the above JSON format
            2. Based on the original data for in-depth analysis, do not simply repeat the data
            3. Provide valuable insights and recommendations
            4. Ensure all numerical analyses are accurate
            5. Risk assessment must be comprehensive and practical"""),
            ("user", "{analysis_data}")
        ])
        
        # Output parser
        self.output_parser = PydanticOutputParser(pydantic_object=TradingReport)
        
    @tool("generate_report")        
    def generate_report(self, quant_analysis_result: Dict[str, Any], market_sentiment_result: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate a comprehensive analysis report based on the provided original quantitative analysis and market sentiment analysis
        """
        try:
            logger.info("Starting to generate trading analysis report")
            
            # Merge two JSON objects as input data
            combined_data = {
                "quant_analysis": quant_analysis_result,
                "market_sentiment": market_sentiment_result
            }
            
            # Call model to generate report
            response = self.model.invoke(
                self.report_prompt.format(analysis_data=json.dumps(combined_data, ensure_ascii=False, indent=2))
            )
            
            # Parse output
            report = self.output_parser.parse(response.content)
            
            # Only return the report content generated by LLM, add timestamp
            report_dict = report.model_dump()
            report_dict.update({
                "quant_analysis": quant_analysis_result,
                "market_sentiment": market_sentiment_result,
                "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            
            logger.info("Trading analysis report generated")
            return report_dict
            
        except Exception as e:
            logger.error(f"Error generating trading analysis report: {str(e)}")
            return {
                "error": str(e)
            } 