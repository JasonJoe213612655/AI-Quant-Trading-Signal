from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType

llm = ChatOpenAI(model="gpt-4o", temperature=0.2)

def get_function_call_tools():
    from core.tools.finance_market_sentiment_analyse import SentimentAgent
    from core.tools.final_report_generation import ReportAgent
    return [SentimentAgent.analyze_market_sentiment, ReportAgent.generate_report]

# 初始化 agent
function_call_agent = initialize_agent(
    tools=get_function_call_tools(),
    llm=llm,
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)