import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Button, List, Tag, Space } from 'antd';
import { ArrowLeftOutlined, HistoryOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface AnalysisData {
  quant_analysis: {
    strategy_performance: string;
    key_metrics: {
      total_return: number;
      sharpe_ratio: number;
    };
    risk_metrics: {
      max_drawdown: number;
      volatility: number;
    };
  };
  market_sentiment: {
    overall_sentiment: string;
    key_factors: string[];
    news_impact: string;
  };
  recommendations: string[];
  risk_assessment: {
    market_risk: string;
    strategy_risk: string;
    risk_mitigation: string[];
  };
}

interface ReportRecord {
  id: string;
  symbol: string;
  timestamp: string;
  analysisData: AnalysisData;
}

const Report: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportHistory, setReportHistory] = useState<ReportRecord[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportRecord | null>(null);

  // 加载历史报告
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('reportHistory') || '[]');
    setReportHistory(history.sort((a: ReportRecord, b: ReportRecord) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }, []);

  // 如果有新的分析数据，添加到历史记录
  useEffect(() => {
    if (location.state) {
      const { analysisData, symbol, timestamp } = location.state as {
        analysisData: AnalysisData;
        symbol: string;
        timestamp: string;
      };

      const newReport: ReportRecord = {
        id: Date.now().toString(),
        symbol,
        timestamp,
        analysisData
      };

      const updatedHistory = [newReport, ...reportHistory];
      localStorage.setItem('reportHistory', JSON.stringify(updatedHistory));
      setReportHistory(updatedHistory);
      setSelectedReport(newReport);
    }
  }, [location.state]);

  // 如果没有历史记录
  if (reportHistory.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')}
              style={{ marginRight: 16 }}
            >
              Back
            </Button>
            <Title level={3} style={{ margin: 0 }}>Trading Report</Title>
          </div>
          <Paragraph>
            No analysis history available. Please go back to the Trading page to generate a new analysis.
          </Paragraph>
        </Card>
      </div>
    );
  }

  // 渲染报告内容
  const renderReportContent = (report: ReportRecord) => {
    const { analysisData, symbol, timestamp } = report;
    
    return (
      <>
        <Card style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')}
              style={{ marginRight: 16 }}
            >
              Back
            </Button>
            <Title level={3} style={{ margin: 0 }}>Trading Report - {symbol}</Title>
          </div>
          <Paragraph>
            Analysis Time: {new Date(timestamp).toLocaleString()}
          </Paragraph>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <ReactECharts option={{
    title: {
              text: `${symbol} Trading Signal Analysis`
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
          }} />
        </Card>

        <Card title="Quantitative Analysis" style={{ marginBottom: 24 }}>
          <Table
            columns={[
              { title: 'Metric', dataIndex: 'metric' },
              { title: 'Value', dataIndex: 'value' },
            ]}
            dataSource={[
              {
                key: '1',
                metric: 'Total Return',
                value: `${(analysisData.quant_analysis.key_metrics.total_return * 100).toFixed(2)}%`,
              },
              {
                key: '2',
                metric: 'Sharpe Ratio',
                value: analysisData.quant_analysis.key_metrics.sharpe_ratio.toFixed(2),
              },
              {
                key: '3',
                metric: 'Max Drawdown',
                value: `${(analysisData.quant_analysis.risk_metrics.max_drawdown * 100).toFixed(2)}%`,
              },
              {
                key: '4',
                metric: 'Volatility',
                value: `${(analysisData.quant_analysis.risk_metrics.volatility * 100).toFixed(2)}%`,
              },
            ]}
          />
        </Card>

        <Card title="Market Sentiment" style={{ marginBottom: 24 }}>
          <Paragraph>
            Overall Sentiment: {analysisData.market_sentiment.overall_sentiment}
          </Paragraph>
          <Paragraph>
            Key Factors:
            <ul>
              {analysisData.market_sentiment.key_factors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          </Paragraph>
          <Paragraph>
            News Impact: {analysisData.market_sentiment.news_impact}
          </Paragraph>
        </Card>

        <Card title="Recommendations" style={{ marginBottom: 24 }}>
          <ul>
            {analysisData.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </Card>

        <Card title="Risk Assessment">
          <Paragraph>
            Market Risk: {analysisData.risk_assessment.market_risk}
          </Paragraph>
          <Paragraph>
            Strategy Risk: {analysisData.risk_assessment.strategy_risk}
          </Paragraph>
          <Paragraph>
            Risk Mitigation:
            <ul>
              {analysisData.risk_assessment.risk_mitigation.map((mitigation, index) => (
                <li key={index}>{mitigation}</li>
              ))}
            </ul>
          </Paragraph>
        </Card>
      </>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/')}
            style={{ marginRight: 16 }}
          >
            Back
          </Button>
          <Title level={3} style={{ margin: 0 }}>Trading Report History</Title>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 历史记录列表 */}
        <Card style={{ width: '300px' }}>
          <List
            dataSource={reportHistory}
            renderItem={report => (
              <List.Item>
                <Button
                  type={selectedReport?.id === report.id ? 'primary' : 'text'}
                  onClick={() => setSelectedReport(report)}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Tag color="blue">{report.symbol}</Tag>
                      <span style={{ marginLeft: 8 }}>
                        {new Date(report.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {report.analysisData.market_sentiment.overall_sentiment}
                    </div>
                  </Space>
                </Button>
              </List.Item>
            )}
          />
      </Card>

        {/* 报告内容 */}
        <div style={{ flex: 1 }}>
          {selectedReport ? (
            renderReportContent(selectedReport)
          ) : (
      <Card>
              <Paragraph>
                Please select a report from the history to view its details.
              </Paragraph>
      </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report; 