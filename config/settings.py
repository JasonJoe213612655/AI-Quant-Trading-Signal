import os
from dotenv import load_dotenv

# Loading environment variables
load_dotenv()

# API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Log settings
LOG_LEVEL = 'INFO'
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

# Trading settings
TRADING_PAIRS = ['BTC-USD', 'ETH-USD', 'BNB-USD']
START_DATE = '2023-01-01'
END_DATE = '2024-01-01'
INITIAL_CAPITAL = 100000
POSITION_SIZE = 0.1  # 10% of the trading capital
COMMISSION_RATE = 0.001  # 0.1% commission
SLIPPAGE = 0.001  # 0.1% slippage

# Strategy parameters
RSI_OVERSOLD = 30
RSI_OVERBOUGHT = 70
MACD_FAST_PERIOD = 12
MACD_SLOW_PERIOD = 26
MACD_SIGNAL_PERIOD = 9
ADX_THRESHOLD = 25
ATR_MULTIPLIER = 2

# Data configuration
DEFAULT_TIMEFRAME = '1d'
DEFAULT_START_DATE = '2020-01-01'
DEFAULT_END_DATE = None  # Use current date

# Backtest configuration
DEFAULT_INITIAL_CASH = 100000.0
DEFAULT_COMMISSION = 0.001  # 0.1%

# Popular asset list
POPULAR_ASSETS = {
    '1': {  # Global stocks
        'name': 'Global stocks',
        'assets': [
            'AAPL',  # Apple
            'MSFT',  # Microsoft
            'GOOGL', # Google
            'AMZN',  # Amazon
            'META',  # Meta
            'NVDA',  # NVIDIA
            'TSLA',  # Tesla
            'BABA',  # Alibaba
            'PDD',   # PDD
            'NIO',   # NIO
            'JPM',   # JPMorgan Chase
            'V',     # Visa
            'WMT',   # Walmart
            'MA',    # Mastercard
            'HD',    # Home Depot
            'BAC',   # Bank of America
            'XOM',   # ExxonMobil
            'PFE',   # Pfizer
            'AVGO',  # Broadcom
            'COST',  # Costco
            'TMO',   # Thermo Fisher Scientific
            'CSCO',  # Cisco
            'DHR',   # Danaher
            'ABBV',  # AbbVie
            'WFC',   # Wells Fargo
            'MRK',   # Merck
            'VZ',    # Verizon
            'NKE',   # Nike
            'CRM',   # Salesforce
            'NEE'    # NextEra Energy
        ]
    },
    '2': {  # ETF
        'name': 'ETF',
        'assets': [
            'SPY',   # S&P 500 ETF
            'QQQ',   # Nasdaq 100 ETF
            'DIA',   # Dow Jones ETF
            'IWM',   # Russell 2000 ETF
            'EFA',   # Developed Markets ETF
            'EEM',   # Emerging Markets ETF
            'GLD',   # Gold ETF
            'SLV',   # Silver ETF
            'TLT',   # 20-year Treasury ETF
            'VNQ',   # Real Estate ETF
            'XLK',   # Technology ETF
            'XLF',   # Financial ETF
            'XLE',   # Energy ETF
            'XLV',   # Healthcare ETF
            'XLI',   # Industrial ETF
            'XLP',   # Consumer Staples ETF
            'XLY',   # Consumer Discretionary ETF
            'XLB',   # Materials ETF
            'XLU',   # Utilities ETF
            'XBI',   # Biotechnology ETF
            'ARKK',  # ARK Innovation ETF
            'IEFA',  # Developed Markets ETF
            'IEMG',  # Emerging Markets ETF
            'AGG',   # US Aggregate Bond ETF
            'LQD',   # Investment-grade Corporate Bond ETF
            'HYG',   # High-yield Corporate Bond ETF
            'GDX',   # Gold Miners ETF
            'GDXJ',  # Small-cap Gold Miners ETF
            'USO',   # Crude Oil ETF
            'UNG',   # Natural Gas ETF
        ]
    },
    '3': {  # Forex
        'name': 'Forex',
        'assets': [
            'EURUSD=X',  # EUR/USD
            'GBPUSD=X',  # GBP/USD
            'USDJPY=X',  # USD/JPY
            'AUDUSD=X',  # AUD/USD
            'USDCAD=X',  # USD/CAD
            'NZDUSD=X',  # NZD/USD
            'USDCHF=X',  # USD/CHF
            'EURGBP=X',  # EUR/GBP
            'EURJPY=X',  # EUR/JPY
            'GBPJPY=X',  # GBP/JPY
            'EURCAD=X',  # EUR/CAD
            'AUDJPY=X',  # AUD/JPY
            'NZDJPY=X',  # NZD/JPY
            'GBPAUD=X',  # GBP/AUD
            'EURAUD=X',  # EUR/AUD
            'USDSGD=X',  # USD/SGD
            'USDHKD=X',  # USD/HKD
            'EURCHF=X',  # EUR/CHF
            'GBPCHF=X',  # GBP/CHF
            'AUDNZD=X',  # AUD/NZD
            'CADJPY=X',  # CAD/JPY
            'CHFJPY=X',  # CHF/JPY
            'EURCAD=X',  # EUR/CAD
            'GBPNZD=X',  # GBP/NZD
            'AUDCAD=X',  # AUD/CAD
            'NZDCHF=X',  # NZD/CHF
            'CADCHF=X',  # CAD/CHF
            'EURHKD=X',  # EUR/HKD
            'GBPHKD=X',  # GBP/HKD
            'AUDHKD=X'   # AUD/HKD
        ]
    },
    '4': {  # Cryptocurrency
        'name': 'Cryptocurrency',
        'assets': [
            'BTC-USD',  # BTC/USD
            'ETH-USD',  # ETH/USD
            'BNB-USD',  # BNB/USD
            'XRP-USD',  # XRP/USD
            'ADA-USD',  # ADA/USD
            'DOGE-USD', # DOGE/USD
            'DOT-USD',  # DOT/USD
            'SOL-USD',  # SOL/USD
            'AVAX-USD', # AVAX/USD
            'MATIC-USD',# MATIC/USD
            'LINK-USD', # LINK/USD
            'UNI-USD',  # UNI/USD
            'AAVE-USD', # AAVE/USD
            'COMP-USD', # COMP/USD
            'SUSHI-USD',# SUSHI/USD
            'YFI-USD',  # YFI/USD
            'SNX-USD',  # SNX/USD
            'MKR-USD',  # MKR/USD
            'CRV-USD',  # CRV/USD
            'BAL-USD',  # Balancer
            'SXP-USD',  # SXP
            'CAKE-USD', # PancakeSwap
            'RUNE-USD', # THORChain
            'GRT-USD',  # The Graph
            'LRC-USD',  # Loopring
            'ZRX-USD',  # 0x
            'BAT-USD',  # Basic Attention Token
            'ENJ-USD',  # Enjin
            'MANA-USD', # Decentraland
            'SAND-USD'  # The Sandbox
        ]
    }
}

# Strategy parameters
STRATEGY_PARAMS = {
    'ClassicTrendFollow': {
        'macd_fast': 12,
        'macd_slow': 26,
        'macd_signal': 9,
        'sma_short': 20,
        'sma_mid': 50,
        'sma_long': 200,
        'adx_period': 14,
        'adx_threshold': 25,
        'rsi_period': 14,
        'rsi_oversold': 30,
        'rsi_overbought': 70,
        'trailing_percent': 0.02,
        'profit_take': 0.05
    },
    'StrongStockPullback': {
        'rsi_period': 14,
        'sma_short': 50,
        'sma_long': 200,
        'adx_period': 14,
        'rsi_entry': 40,
        'rsi_exit': 70,
        'adx_threshold': 25
    },
    'MATrend': {
        'ema_short': 5,
        'ema_long': 20,
        'adx_period': 14,
        'adx_threshold': 25
    }
} 

# strategy configuration
STRATEGY_CONFIG = [
    # 1. Trend Breakout Strategy
    {
        "name": "Trend Breakout Strategy",
        "indicators": ["SMA", "ADX"],
        "params": {
            "SMA": {
                "period": 50
            },
            "ADX": {
                "period": 14
            }
        },
        "rule": [
            {
                "type": "entry",
                "expr": "CrossOver_SMA > 0 and ADX > 25"
            },
            {
                "type": "exit",
                "expr": "CrossOver_SMA < 0 or ADX < 20"
            }
        ]
    },
    # 2. Momentum Pullback Strategy
    {
        "name": "Momentum Pullback Strategy",
        "indicators": ["RSI", "EMA"],
        "params": {
            "RSI": {
                "period": 14
            },
            "EMA": {
                "period": 21
            }
        },
        "rule": [
            {
                "type": "entry",
                "expr": "RSI < 30 and CrossOver_EMA > 0"
            },
            {
                "type": "exit",
                "expr": "RSI > 70 or CrossOver_EMA < 0"
            }
        ]
    },
    # 3. MACD Crossover Strategy
    {
        "name": "MACD Crossover Strategy",
        "indicators": ["MACD"],
        "params": {
            "MACD": {
                "period_me1": 12,    # 快速移动平均周期
                "period_me2": 26,    # 慢速移动平均周期
                "period_signal": 9   # 信号线周期
            }
        },
        "rule": [
            {
                "type": "entry",
                "expr": "CrossOver_MACD > 0"
            },
            {
                "type": "exit",
                "expr": "CrossOver_MACD < 0"
            }
        ]
    },
    # 4. Moving Average Crossover Strategy
    {
        "name": "Moving Average Crossover Strategy",
        "indicators": ["SMA", "EMA"],
        "params": {
            "SMA": {
                "period": 50
            },
            "EMA": {
                "period": 20
            }
        },
        "rule": [
            {
                "type": "entry",
                "expr": "CrossOver_EMA > 0"
            },
            {
                "type": "exit",
                "expr": "CrossOver_EMA < 0"
            }
        ]
    }
]
