"""
Indicator metadata configuration file
Contains all technical indicator parameter spaces, field definitions, and rule templates
"""

# from langchain.prompts import ChatPromptTemplate
# from langchain_core.output_parsers import JsonOutputParser
# from langchain.chat_models.openai import ChatOpenAI
# from langchain_core.tools import tool
# import json
# import textwrap
# from typing import Dict, Any
# from utils.logger import setup_logger
# from config.settings import STRAT_SCHEMA, INDICATOR_META

# logger = setup_logger(__name__)

# def build_prompt(indicator_meta: dict,
#                  schema: dict = STRAT_SCHEMA) -> ChatPromptTemplate:
#     """
#     Build the prompt template for strategy generation
    
#     Args:
#         indicator_meta: The dictionary of indicator metadata
#         schema: The definition of strategy configuration schema
        
#     Returns:
#         ChatPromptTemplate: The assembled prompt template
#     """
#     system_part = textwrap.dedent("""
#         You are an expert quant trader.
#         Design only one trading strategy using ONLY the indicators provided below.
        
#         IMPORTANT: You must output ONLY a JSON object that strictly follows this schema:
#         {schema}
        
#         Example of valid output format:
#         {{
#             "name": "Strategy Name",
#             "indicators": ["SMA", "RSI"],
#             "params": {{
#                 "SMA": {{"period": 50}},
#                 "RSI": {{"period": 14, "th_low": 30, "th_high": 70}}
#             }},
#             "rule": "close > SMA and RSI < 30"
#         }}
        
#         DO NOT include any additional text, explanations, or markdown formatting.
#         The output must be a valid JSON object that can be parsed directly.
#         DO NOT add any text before or after the JSON object.
#     """)
    
#     user_part = "### AVAILABLE INDICATORS\n{indicators}"

#     return ChatPromptTemplate.from_messages([
#         ("system", system_part),
#         ("user", user_part)
#     ])

# def generate_strategy() -> dict:
#     """
#     Generate a single trading strategy
#     """
#     try:
#         # Build prompt template
#         prompt = build_prompt(INDICATOR_META, STRAT_SCHEMA)
        
#         parser = JsonOutputParser()
        
#         # Combine into Chain: Prompt → LLM → JSON parsing
#         chain = prompt | llm | parser
        
#         # Execute Chain to generate strategy with required variables
#         result = chain.invoke({
#             "schema": json.dumps(STRAT_SCHEMA, indent=2),
#             "indicators": json.dumps(INDICATOR_META, indent=2, ensure_ascii=False)
#         })
        
#         # 处理返回值
#         if isinstance(result, list) and len(result) > 0:
#             strategy = result[0]
#         else:
#             strategy = result
            
#         # 如果返回的是字符串，尝试解析为字典
#         if isinstance(strategy, str):
#             try:
#                 # 尝试从字符串中提取 JSON 部分
#                 json_str = strategy.split('}')[0] + '}'
#                 strategy = json.loads(json_str)
#             except json.JSONDecodeError:
#                 # 如果解析失败，返回默认策略
#                 strategy = {
#                     "name": "Default Strategy",
#                     "indicators": ["SMA", "RSI"],
#                     "params": {
#                         "SMA": {"period": 50},
#                         "RSI": {"period": 14, "th_low": 30, "th_high": 70}
#                     },
#                     "rule": "close > SMA and RSI < 30"
#                 }
        
#         # 确保返回的是字典
#         if not isinstance(strategy, dict):
#             strategy = {
#                 "name": "Default Strategy",
#                 "indicators": ["SMA", "RSI"],
#                 "params": {
#                     "SMA": {"period": 50},
#                     "RSI": {"period": 14, "th_low": 30, "th_high": 70}
#                 },
#                 "rule": "close > SMA and RSI < 30"
#             }
            
#         return strategy
        
#     except Exception as e:
#         logger.error(f"Error generating strategy: {str(e)}")
#         # 发生错误时返回默认策略
#         return {
#             "name": "Default Strategy",
#             "indicators": ["SMA", "RSI"],
#             "params": {
#                 "SMA": {"period": 50},
#                 "RSI": {"period": 14, "th_low": 30, "th_high": 70}
#             },
#             "rule": "close > SMA and RSI < 30"
#         }

# llm = ChatOpenAI(model="gpt-4o", temperature=0.2)     
# 
  
import random
import json
from typing import Dict, Any
from utils.logger import setup_logger
from config.settings import STRATEGY_CONFIG

logger = setup_logger(__name__)

def generate_strategy() -> Dict[str, Any]:
    """
    从预定义的策略配置中随机选择一个策略
    
    Returns:
        Dict[str, Any]: 随机选择的策略配置
    """
    try:
        # 从 STRATEGY_CONFIG 中随机选择一个策略
        strategy = random.choice(STRATEGY_CONFIG)
        logger.info(f"Selected strategy: {strategy['name']}")
        logger.info(f"Strategy configuration:\n{json.dumps(strategy, indent=2, ensure_ascii=False)}")
        return strategy
        
    except Exception as e:
        logger.error(f"Error selecting strategy: {str(e)}")
        # 发生错误时返回默认策略
        default_strategy = {
            "name": "Default Strategy",
            "indicators": ["SMA", "RSI"],
            "params": {
                "SMA": {"period": 50},
                "RSI": {"period": 14, "th_low": 30, "th_high": 70}
            },
            "rule": [
                {
                    "type": "entry",
                    "expr": "close > SMA and RSI < 30"
                },
                {
                    "type": "exit",
                    "expr": "close < SMA or RSI > 70"
                }
            ]
        }
        logger.info(f"Using default strategy:\n{json.dumps(default_strategy, indent=2, ensure_ascii=False)}")
        return default_strategy

