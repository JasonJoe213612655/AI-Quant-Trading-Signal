import React, { useState } from 'react';
import { Card, Input, Button, Table, message, Radio, Space, List, Typography, Modal, Spin } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Trading: React.FC = () => {
  const navigate = useNavigate();
  const [assetType, setAssetType] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [showAssetList, setShowAssetList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const assetTypes = [
    { value: 'stock', label: 'Global Stock' },
    { value: 'etf', label: 'ETF' },
    { value: 'forex', label: 'Forex' },
    { value: 'crypto', label: 'Crypto' },
  ];

  const assetLists = {
    stock: [
      'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'BABA', 'PDD', 'NIO',
      'JPM', 'V', 'WMT', 'MA', 'HD', 'BAC', 'XOM', 'PFE', 'AVGO', 'COST',
      'TMO', 'CSCO', 'DHR', 'ABBV', 'WFC', 'MRK', 'VZ', 'NKE', 'CRM', 'NEE'
    ],
    etf: [
      'SPY', 'QQQ', 'DIA', 'IWM', 'EFA', 'EEM', 'GLD', 'SLV', 'TLT', 'VNQ',
      'XLK', 'XLF', 'XLE', 'XLV', 'XLI', 'XLP', 'XLY', 'XLB', 'XLU', 'XBI',
      'ARKK', 'IEFA', 'IEMG', 'AGG', 'LQD', 'HYG', 'GDX', 'GDXJ', 'USO', 'UNG'
    ],
    forex: [
      'EURUSD=X', 'GBPUSD=X', 'USDJPY=X', 'AUDUSD=X', 'USDCAD=X', 'NZDUSD=X', 'USDCHF=X',
      'EURGBP=X', 'EURJPY=X', 'GBPJPY=X', 'EURCAD=X', 'AUDJPY=X', 'NZDJPY=X', 'GBPAUD=X',
      'EURAUD=X', 'USDSGD=X', 'USDHKD=X', 'EURCHF=X', 'GBPCHF=X', 'AUDNZD=X'
    ],
    crypto: [
      'BTC-USD', 'ETH-USD', 'BNB-USD', 'XRP-USD', 'ADA-USD', 'DOGE-USD', 'DOT-USD',
      'SOL-USD', 'AVAX-USD', 'MATIC-USD', 'LINK-USD', 'UNI-USD', 'AAVE-USD', 'COMP-USD',
      'SUSHI-USD', 'YFI-USD', 'SNX-USD', 'MKR-USD', 'CRV-USD', 'BAL-USD'
    ]
  };

  const handleAssetTypeChange = (value: string) => {
    setAssetType(value);
    setShowAssetList(true);
    setSymbol('');
  };

  const handleAssetSelect = (selectedSymbol: string) => {
    setSymbol(selectedSymbol);
    setShowAssetList(false);
  };

  const handleSubmit = async () => {
    try {
      if (!assetType) {
        message.warning('Please select asset type');
        return;
      }
      if (!symbol) {
        message.warning('Please input asset code');
        return;
      }
      
      // 显示加载弹窗
      setLoading(true);
      
      // 调用后端API
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: symbol
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // 关闭加载弹窗
      setLoading(false);
      message.success('Analysis completed');
      
      // 导航到Report页面，并传递分析数据
      navigate('/report', { 
        state: { 
          analysisData: data,
          symbol: symbol,
          timestamp: new Date().toISOString()
        }
      });
      
    } catch (error) {
      setLoading(false);
      message.error('Operation failed, please try again');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')}
              style={{ marginRight: 16 }}
            >
              Back
            </Button>
            <span>Generate Trading Signal</span>
          </div>
        }
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <h3>Please select asset type:</h3>
            <Radio.Group
              value={assetType}
              onChange={e => handleAssetTypeChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {assetTypes.map(type => (
                  <Radio.Button 
                    key={type.value} 
                    value={type.value}
                    style={{ 
                      width: '100%', 
                      textAlign: 'center',
                      height: '40px',
                      lineHeight: '40px',
                      marginBottom: '8px'
                    }}
                  >
                    {type.label}
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h3>Please input asset code:</h3>
            <Input
              style={{ width: '100%' }}
              placeholder="For example: BTC-USD, AAPL, EURUSD=X"
              value={symbol}
              onChange={e => setSymbol(e.target.value)}
            />
          </div>

          {showAssetList && assetType && (
            <div style={{ marginBottom: 16 }}>
              <h3>Asset reference list:</h3>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={assetLists[assetType as keyof typeof assetLists]}
                renderItem={item => (
                  <List.Item>
                    <Button 
                      type="text" 
                      onClick={() => handleAssetSelect(item)}
                      style={{ 
                        width: '100%',
                        textAlign: 'center',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px'
                      }}
                    >
                      <Text>{item}</Text>
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          )}

          <Button 
            type="primary" 
            onClick={handleSubmit}
            style={{ width: '100%', height: '40px' }}
          >
            Start Analyse
          </Button>
        </div>
      </Card>

      <Modal
        open={loading}
        footer={null}
        closable={false}
        centered
        width={300}
        style={{ background: 'transparent' }}
        styles={{
          body: {
            background: 'rgba(26, 43, 60, 0.6)',
            backdropFilter: 'blur(4px)',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center'
          }
        }}
      >
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 36, color: '#fff' }} spin />} 
        />
        <div style={{ 
          color: '#fff', 
          marginTop: '16px',
          fontSize: '16px'
        }}>
          Analyzing...
        </div>
      </Modal>
    </>
  );
};

export default Trading; 