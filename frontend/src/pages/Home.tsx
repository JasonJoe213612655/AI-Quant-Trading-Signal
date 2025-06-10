import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: '24px',
      minHeight: '100vh',
      background: '#0a0f1a',
      position: 'relative',
      zIndex: 1
    }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card style={{ 
            background: '#1a2b3c', 
            border: 'none',
            backdropFilter: 'blur(10px)'
          }}>
            <Title level={1} style={{ color: '#fff', textAlign: 'center' }}>
              JPMorgan Chase
            </Title>
          </Card>
        </Col>

        <Col span={24}>
          <Card style={{ background: '#1a1a1a', border: 'none', height: '400px', overflow: 'hidden', position: 'relative' }}>
            {/* Background grid */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              animation: 'gridMove 20s linear infinite'
            }} />
            
            {/* Data flow effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
              animation: 'dataFlow 3s linear infinite'
            }} />

            {/* Price fluctuation line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
              animation: 'priceWave 2s ease-in-out infinite'
            }} />

            {/* Trading indicators */}
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '20%',
              fontSize: '24px',
              color: '#FFD700',
              animation: 'indicatorPulse 2s infinite'
            }}>
              📈 RSI: 65
            </div>
            <div style={{
              position: 'absolute',
              top: '40%',
              right: '20%',
              fontSize: '24px',
              color: '#FFD700',
              animation: 'indicatorPulse 2s infinite 0.5s'
            }}>
              📊 MACD: 0.25
            </div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '20%',
              fontSize: '24px',
              color: '#FFD700',
              animation: 'indicatorPulse 2s infinite 1s'
            }}>
              📉 KDJ: 45
            </div>

            {/* Trading signal */}
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '20%',
              fontSize: '24px',
              color: '#FFD700',
              animation: 'signalGlow 2s infinite'
            }}>
              💡 Buy Signal
            </div>

            {/* Center Title */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '48px',
              color: '#FFD700',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
              animation: 'titleGlow 2s infinite'
            }}>
              AI Quant Trading Analysis
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card 
                style={{ 
                  background: '#2a2a2a', 
                  border: 'none',
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => navigate('/trading')}
                hoverable
              >
                <Title level={3} style={{ color: '#fff' }}>AI Quant Trading Analyse</Title>
                <Paragraph style={{ color: '#fff', textAlign: 'center' }}>
                  Select asset type, input trading pair, generate professional trading analysis by AI
                </Paragraph>
                <Button 
                  type="primary" 
                  size="large"
                  style={{ marginTop: '20px' }}
                >
                  Start Analyse
                </Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                style={{ 
                  background: '#2a2a2a', 
                  border: 'none',
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => navigate('/report')}
                hoverable
              >
                <Title level={3} style={{ color: '#fff' }}>Quant AI Analysis Report</Title>
                <Paragraph style={{ color: '#fff', textAlign: 'center' }}>
                  View historical trading records, analyze trading performance, optimize trading strategies by AI
                </Paragraph>
                <Button 
                  type="primary" 
                  size="large"
                  style={{ marginTop: '20px' }}
                >
                  View Report
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card style={{ background: '#1a1a1a', border: 'none' }}>
            <Title level={3} style={{ color: '#fff' }}>Main Functions</Title>
            <Row gutter={[24, 24]}>
              <Col span={6}>
                <Card style={{ background: '#2a2a2a', border: 'none' }}>
                  <Title level={4} style={{ color: '#fff' }}>Select Asset Type</Title>
                  <Paragraph style={{ color: '#fff' }}>
                    Support a variety of asset types such as global stocks, ETFs, foreign exchange, and cryptocurrencies
                  </Paragraph>
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ background: '#2a2a2a', border: 'none' }}>
                  <Title level={4} style={{ color: '#fff' }}>View Reference List</Title>
                  <Paragraph style={{ color: '#fff' }}>
                    Provide a rich asset code reference, convenient for quick selection
                  </Paragraph>
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ background: '#2a2a2a', border: 'none' }}>
                  <Title level={4} style={{ color: '#fff' }}>Input Trading Pair</Title>
                  <Paragraph style={{ color: '#fff' }}>
                    Support a variety of trading pair formats to meet different market needs
                  </Paragraph>
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ background: '#2a2a2a', border: 'none' }}>
                  <Title level={4} style={{ color: '#fff' }}>Generate Trading Report</Title>
                  <Paragraph style={{ color: '#fff' }}>
                    Generate professional trading suggestion reports based on AI analysis
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <style>
        {`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 20px 20px; }
          }
          
          @keyframes dataFlow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes priceWave {
            0% { transform: translate(-50%, -50%) scaleX(1); }
            50% { transform: translate(-50%, -50%) scaleX(1.2); }
            100% { transform: translate(-50%, -50%) scaleX(1); }
          }
          
          @keyframes indicatorPulse {
            0% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.5; transform: scale(1); }
          }
          
          @keyframes signalGlow {
            0% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
            50% { text-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
            100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
          }
          
          @keyframes titleGlow {
            0% { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
            50% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
            100% { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
          }

          .ant-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
          }
        `}
      </style>
    </div>
  );
};

export default Home; 