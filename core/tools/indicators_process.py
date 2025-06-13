import pandas as pd
import numpy as np
import talib
import yfinance as yf
import logging
from datetime import datetime, timedelta
from typing import Optional
from utils.logger import setup_logger
logger = setup_logger(__name__)

def get_historical_data(symbol: str) -> Optional[pd.DataFrame]:
    """
    Get historical data for an asset, default from the current time to 1 year ago.    
    Parameters:
    symbol: asset code, e.g. 'AAPL'

    Returns:
    DataFrame containing historical data, or None if failed
    """
    try:
        # Set default date range
        end_date = datetime.now().strftime('%Y-%m-%d')
        start_date = (datetime.now() - timedelta(days=365*3)).strftime('%Y-%m-%d')
            
        # Get historical data
        ticker = yf.Ticker(symbol)
        df = ticker.history(start=start_date, end=end_date)
        
        if df.empty:
            logging.warning(f"No historical data found for {symbol}")
            return None
            
        # Rename columns, only rename existing columns
        column_mapping = {
            'Open': 'Open',
            'High': 'High',
            'Low': 'Low',
            'Close': 'Close',
            'Volume': 'Volume',
            'Dividends': 'Dividends',
            'Stock Splits': 'Stock_Splits'
        }
        
        # Only rename existing columns
        existing_columns = [col for col in column_mapping.keys() if col in df.columns]
        df = df.rename(columns={col: column_mapping[col] for col in existing_columns})
        
        return df
        
    except Exception as e:
        logging.error(f"Error getting historical data for {symbol}: {str(e)}")
        return None

def calculate_indicators(data: pd.DataFrame) -> pd.DataFrame:
    """
    Calculate all technical indicators
    :param data: DataFrame containing OHLCV data
    :return: DataFrame with added technical indicators
    """
    try:
        # convert time index to column (if already a column, skip)
        if 'Date' in data.columns:
            data = data.rename(columns={'Date': 'datetime'})
        elif data.index.name == 'Date':
            data = data.reset_index()
            data = data.rename(columns={'Date': 'datetime'})
        
        # ensure datetime column has correct data type
        data['datetime'] = pd.to_datetime(data['datetime'])
        
        # ensure data column names are lowercase
        column_mapping = {
            'datetime': 'datetime',  # keep datetime column name unchanged
            'Open': 'open',
            'High': 'high',
            'Low': 'low',
            'Close': 'close',
            'Volume': 'volume',
            'Dividends': 'dividends',
            'Stock_Splits': 'stock_splits'
        }
        
        # only rename existing columns
        existing_columns = [col for col in column_mapping.keys() if col in data.columns]
        data = data.rename(columns={col: column_mapping[col] for col in existing_columns})
        
        # Calculate moving average lines
        data['SMA_5'] = talib.SMA(data['close'], timeperiod=5)
        data['SMA_10'] = talib.SMA(data['close'], timeperiod=10)
        data['SMA_20'] = talib.SMA(data['close'], timeperiod=20)
        data['SMA_50'] = talib.SMA(data['close'], timeperiod=50)
        data['SMA_200'] = talib.SMA(data['close'], timeperiod=200)
        
        # Calculate exponential moving average lines
        data['EMA_5'] = talib.EMA(data['close'], timeperiod=5)
        data['EMA_10'] = talib.EMA(data['close'], timeperiod=10)
        data['EMA_20'] = talib.EMA(data['close'], timeperiod=20)
        data['EMA_50'] = talib.EMA(data['close'], timeperiod=50)
        
        # Calculate MACD
        macd, signal, hist = talib.MACD(data['close'])
        data['MACD'] = macd
        data['MACD_SIGNAL'] = signal
        data['MACD_HIST'] = hist
        
        # Calculate RSI
        data['RSI'] = talib.RSI(data['close'], timeperiod=14)
        
        # Calculate ADX
        data['ADX'] = talib.ADX(data['high'], data['low'], data['close'], timeperiod=14)
        
        # Calculate Bollinger Bands
        upper, middle, lower = talib.BBANDS(data['close'], timeperiod=20)
        data['BB_UPPER'] = upper
        data['BB_MIDDLE'] = middle
        data['BB_LOWER'] = lower
        
        # Calculate ATR
        data['ATR'] = talib.ATR(data['high'], data['low'], data['close'], timeperiod=14)
        
        # Calculate Donchian Channels
        data['DONCHIAN_HIGH'] = data['high'].rolling(window=20).max()
        data['DONCHIAN_LOW'] = data['low'].rolling(window=20).min()
        
        # Calculate Rate of Change
        data['ROC'] = talib.ROC(data['close'], timeperiod=10)
        
        # Calculate On Balance Volume
        data['OBV'] = talib.OBV(data['close'], data['volume'])
        
        # Calculate Stochastic Oscillator
        data['STOCH_K'], data['STOCH_D'] = talib.STOCH(data['high'], data['low'], data['close'])
        
        # Calculate Volatility
        data['VOLATILITY'] = data['close'].pct_change().rolling(window=20).std()
        
        # Calculate Price Change
        data['PRICE_CHANGE'] = data['close'].pct_change()
        
        # Calculate Volume Change
        data['VOLUME_CHANGE'] = data['volume'].pct_change()
        
        # Calculate High-Low Range
        data['HIGH_LOW_RANGE'] = data['high'] - data['low']
        
        # Add position column
        data['CLOSE_POSITION'] = 0
        
        logger.info("Technical indicators calculated successfully")
        logger.info(f"Final data columns: {data.columns.tolist()}")
        return data
        
    except Exception as e:
        logger.error(f"Error calculating indicators: {str(e)}")
        logger.error(f"Data columns: {data.columns.tolist()}")
        logger.error(f"Data shape: {data.shape}")
        return None 