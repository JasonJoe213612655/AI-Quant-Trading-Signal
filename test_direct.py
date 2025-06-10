from core.tools.backtest import backtest_strategy
from core.tools.indicators_process import get_historical_data, calculate_indicators
import pandas as pd

# 测试策略配置
strategy = {
    'name': 'Test Strategy',
    'indicators': ['SMA', 'EMA'],
    'params': {
        'SMA': {'period': 20},
        'EMA': {'period': 20}
    },
    'rule': [
        {'type': 'entry', 'expr': 'CrossOver_EMA > 0'},
        {'type': 'exit', 'expr': 'CrossOver_EMA < 0'}
    ]
}

try:
    print('获取历史数据...')
    data = get_historical_data('AAPL')
    print('计算指标...')
    data_with_indicators = calculate_indicators(data)
    print('运行回测...')
    result = backtest_strategy(data_with_indicators, strategy)
    print('✅ 回测成功！')
    print(f'策略名称: {result["strategy_name"]}')
    print(f'总收益: {result["total_return"]:.2%}')
    print(f'胜率: {result["win_rate"]:.2%}')
    print(f'交易次数: {result["total_trades"]}')
    print('🎉 AutoOrderedDict 问题已解决！')
except Exception as e:
    print(f'❌ 错误: {str(e)}')
    import traceback
    traceback.print_exc() 