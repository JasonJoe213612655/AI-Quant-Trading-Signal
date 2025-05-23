"""
回测模块
使用backtrader实现回测功能
"""

import backtrader as bt
import pandas as pd
import numpy as np
from typing import List, Dict, Any
from datetime import datetime
from utils.logger import setup_logger
from config.settings import (
    INITIAL_CAPITAL,
    COMMISSION_RATE
)
from core.agents.Strategy_agent import generate_strategies

logger = setup_logger(__name__)

class BacktestEngine:
    def __init__(self):
        """初始化回测引擎"""
        self.cerebro = bt.Cerebro()
        self.cerebro.broker.setcash(INITIAL_CAPITAL)
        self.cerebro.broker.setcommission(commission=COMMISSION_RATE)
        self.cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次交易10%仓位
        self.strategy_config = None
        
        # 添加分析器
        self.cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpe')
        self.cerebro.addanalyzer(bt.analyzers.DrawDown, _name='drawdown')
        self.cerebro.addanalyzer(bt.analyzers.TradeAnalyzer, _name='trades')
        self.cerebro.addanalyzer(bt.analyzers.Returns, _name='returns')

    def set_data(self, data: pd.DataFrame) -> None:
        """
        设置回测数据
        
        Args:
            data: 包含历史价格和技术指标的DataFrame
        """
        if not isinstance(data, pd.DataFrame):
            raise ValueError("回测数据必须是pandas DataFrame")
            
        required_columns = ['OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME']
        if not all(col in data.columns for col in required_columns):
            raise ValueError("回测数据必须包含OHLCV数据")
            
        # 转换数据格式
        data = data.rename(columns={
            'OPEN': 'open',
            'HIGH': 'high',
            'LOW': 'low',
            'CLOSE': 'close',
            'VOLUME': 'volume'
        })
        
        # 添加数据到回测引擎
        datafeed = bt.feeds.PandasData(dataname=data)
        self.cerebro.adddata(datafeed)

    def add_strategy(self, strategy_config: Dict[str, Any]) -> None:
        """
        添加策略
        
        Args:
            strategy_config: 策略配置字典，由generate_strategies生成
        """
        self.strategy_config = strategy_config
        
        # 创建策略类
        class Strategy(bt.Strategy):
            def __init__(self):
                self.indicators = {}
                for indicator in strategy_config['indicators']:
                    params = strategy_config['params'].get(indicator, {})
                    self.indicators[indicator] = getattr(bt.indicators, indicator)(**params)
                    
            def next(self):
                if self.order:
                    return
                    
                rule = strategy_config['rule']
                if not self.position:
                    if eval(rule, {
                        'close': self.data.close[0],
                        **{k: v[0] for k, v in self.indicators.items()}
                    }):
                        self.buy()
                else:
                    if not eval(rule, {
                        'close': self.data.close[0],
                        **{k: v[0] for k, v in self.indicators.items()}
                    }):
                        self.close()
                        
        self.cerebro.addstrategy(Strategy)

    def run_backtest(self) -> Dict[str, Any]:
        """
        运行回测
        
        Returns:
            Dict[str, Any]: 回测结果
        """
        # 运行回测
        results = self.cerebro.run()
        
        # 获取回测结果
        strat = results[0]
        
        # 计算回测指标
        total_return = (self.cerebro.broker.getvalue() / INITIAL_CAPITAL) - 1
        
        # 计算年化收益率
        days = (strat.data.datetime.date(-1) - strat.data.datetime.date(0)).days
        annual_return = (1 + total_return) ** (365 / days) - 1
        
        # 计算最大回撤
        drawdown = strat.analyzers.drawdown.get_analysis()
        max_drawdown = drawdown['max']['drawdown'] / 100
        
        # 计算夏普比率
        sharpe = strat.analyzers.sharpe.get_analysis()
        sharpe_ratio = sharpe['sharperatio']
        
        # 计算胜率
        trades = strat.analyzers.trades.get_analysis()
        win_rate = trades['won'] / trades['total'] if trades['total'] > 0 else 0
        
        return {
            'strategy_name': self.strategy_config['name'],
            'total_return': total_return,
            'annual_return': annual_return,
            'max_drawdown': max_drawdown,
            'sharpe_ratio': sharpe_ratio,
            'win_rate': win_rate,
            'total_trades': trades['total'],
            'trades': trades,
            'equity_curve': strat.analyzers.returns.get_analysis()
        }

def backtest_strategy(strategy: Dict[str, Any], 
                     data: pd.DataFrame,
                     initial_capital: float = 100000.0) -> Dict[str, Any]:
    """
    回测单个策略
    
    Args:
        strategy: 策略配置字典
        data: 回测数据
        initial_capital: 初始资金
        
    Returns:
        Dict[str, Any]: 回测结果
    """
    engine = BacktestEngine()
    engine.set_data(data)
    engine.add_strategy(strategy)
    return engine.run_backtest()

def backtest_strategies(strategies: List[Dict[str, Any]],
                       data: pd.DataFrame,
                       initial_capital: float = 100000.0) -> List[Dict[str, Any]]:
    """
    回测多个策略
    
    Args:
        strategies: 策略配置列表
        data: 回测数据
        initial_capital: 初始资金
        
    Returns:
        List[Dict[str, Any]]: 回测结果列表
    """
    results = []
    for strategy in strategies:
        result = backtest_strategy(strategy, data, initial_capital)
        results.append(result)
    return results

def backtest_generated_strategies(data: pd.DataFrame,
                                n_strategies: int = 3,
                                initial_capital: float = 100000.0) -> List[Dict[str, Any]]:
    """
    回测由 generate_strategies 生成的策略
    
    Args:
        data: 回测数据
        n_strategies: 要生成的策略数量
        initial_capital: 初始资金
        
    Returns:
        List[Dict[str, Any]]: 回测结果列表
    """
    # 生成策略
    strategies = generate_strategies(n=n_strategies)
    
    # 回测策略
    results = backtest_strategies(strategies, data, initial_capital)
    
    return results 