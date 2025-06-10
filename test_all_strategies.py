from core.tools.backtest import backtest_strategy
from core.tools.indicators_process import get_historical_data, calculate_indicators
from config.settings import STRATEGY_CONFIG
import pandas as pd

def test_all_strategies():
    print("🧪 开始测试所有预定义策略...")
    
    # 获取历史数据
    print("📊 获取历史数据...")
    data = get_historical_data('AAPL')
    data_with_indicators = calculate_indicators(data)
    
    success_count = 0
    total_strategies = len(STRATEGY_CONFIG)
    
    for i, strategy in enumerate(STRATEGY_CONFIG, 1):
        print(f"\n📈 测试策略 {i}/{total_strategies}: {strategy['name']}")
        
        try:
            result = backtest_strategy(data_with_indicators, strategy)
            print(f"✅ {strategy['name']} - 成功!")
            print(f"   总收益: {result['total_return']:.2%}")
            print(f"   胜率: {result['win_rate']:.2%}")
            print(f"   交易次数: {result['total_trades']}")
            print(f"   夏普比率: {result['sharpe_ratio']:.2f}")
            success_count += 1
            
        except Exception as e:
            print(f"❌ {strategy['name']} - 失败: {str(e)}")
    
    print(f"\n🎯 测试完成: {success_count}/{total_strategies} 策略成功")
    
    if success_count == total_strategies:
        print("🎉 所有策略都运行成功！AutoOrderedDict问题已完全解决！")
    else:
        print("⚠️  仍有策略存在问题，需要进一步修复")

if __name__ == "__main__":
    test_all_strategies() 