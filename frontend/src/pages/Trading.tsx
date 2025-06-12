import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  message,
  Radio,
  Space,
  List,
  Typography,
  Modal,
  Spin,
  Tag,
  Row,
  Col,
} from "antd";
import {
  ArrowLeftOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  UserOutlined,
  StarFilled,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text, Title, Paragraph } = Typography;

const JPM_BLUE = "#003366";
const JPM_GRADIENT = "linear-gradient(90deg, #003366 0%, #00539B 100%)";
const GOLD = "#FFD700";

const cardStyle = {
  borderRadius: 14,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  background: "#fff",
  border: "none",
};

const gridBgColors = [
  "linear-gradient(135deg, #fffbe6 0%, #f9f9f6 100%)", // Soft yellow/cream
  "linear-gradient(135deg, #e6fff9 0%, #f6f9fb 100%)", // Soft teal
  "linear-gradient(135deg, #f6e6ff 0%, #f9f6ff 100%)", // Soft purple
  "linear-gradient(135deg, #e3f0ff 0%, #f6f9fb 100%)", // Soft blue
];

const Trading: React.FC = () => {
  const navigate = useNavigate();
  const [assetType, setAssetType] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [showAssetList, setShowAssetList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const assetTypes = [
    { value: "stock", label: "Global Stock" },
    { value: "etf", label: "ETF" },
    { value: "forex", label: "Forex" },
    { value: "crypto", label: "Crypto" },
  ];

  const HIGHLIGHT = "#36cfc9";
  const ACCENT = "#4096ff";

  const assetLists = {
    stock: [
      "AAPL",
      "MSFT",
      "GOOGL",
      "AMZN",
      "META",
      "NVDA",
      "TSLA",
      "BABA",
      "PDD",
      "NIO",
      "JPM",
      "V",
      "WMT",
      "MA",
      "HD",
      "BAC",
      "XOM",
      "PFE",
      "AVGO",
      "COST",
      "TMO",
      "CSCO",
      "DHR",
      "ABBV",
      "WFC",
      "MRK",
      "VZ",
      "NKE",
      "CRM",
      "NEE",
    ],
    etf: [
      "SPY",
      "QQQ",
      "DIA",
      "IWM",
      "EFA",
      "EEM",
      "GLD",
      "SLV",
      "TLT",
      "VNQ",
      "XLK",
      "XLF",
      "XLE",
      "XLV",
      "XLI",
      "XLP",
      "XLY",
      "XLB",
      "XLU",
      "XBI",
      "ARKK",
      "IEFA",
      "IEMG",
      "AGG",
      "LQD",
      "HYG",
      "GDX",
      "GDXJ",
      "USO",
      "UNG",
    ],
    forex: [
      "EURUSD=X",
      "GBPUSD=X",
      "USDJPY=X",
      "AUDUSD=X",
      "USDCAD=X",
      "NZDUSD=X",
      "USDCHF=X",
      "EURGBP=X",
      "EURJPY=X",
      "GBPJPY=X",
      "EURCAD=X",
      "AUDJPY=X",
      "NZDJPY=X",
      "GBPAUD=X",
      "EURAUD=X",
      "USDSGD=X",
      "USDHKD=X",
      "EURCHF=X",
      "GBPCHF=X",
      "AUDNZD=X",
    ],
    crypto: [
      "BTC-USD",
      "ETH-USD",
      "BNB-USD",
      "XRP-USD",
      "ADA-USD",
      "DOGE-USD",
      "DOT-USD",
      "SOL-USD",
      "AVAX-USD",
      "MATIC-USD",
      "LINK-USD",
      "UNI-USD",
      "AAVE-USD",
      "COMP-USD",
      "SUSHI-USD",
      "YFI-USD",
      "SNX-USD",
      "MKR-USD",
      "CRV-USD",
      "BAL-USD",
    ],
  };

  const handleAssetTypeChange = (value: string) => {
    setAssetType(value);
    setShowAssetList(true);
    setSymbol("");
  };

  const handleAssetSelect = (selectedSymbol: string) => {
    setSymbol(selectedSymbol);
    setShowAssetList(false);
  };

  const handleSubmit = async () => {
    try {
      if (!assetType) {
        message.warning("Please select asset type");
        return;
      }
      if (!symbol) {
        message.warning("Please input asset code");
        return;
      }

      setLoading(true);

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: symbol,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      setLoading(false);
      message.success("Analysis completed");

      navigate("/report", {
        state: {
          analysisData: data.data, // extract data from data field
          symbol: symbol,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      setLoading(false);
      message.error("Operation failed, please try again");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ background: JPM_GRADIENT, minHeight: "100vh", padding: 32 }}>
      <Card
        style={cardStyle}
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "12px 0",
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: 1,
                fontFamily: "Segoe UI, Arial, sans-serif",
                textAlign: "center",
                display: "inline-block",
                color: "#1976d2",
              }}
            >
              ChaseQuant AI Trader
            </span>
          </div>
        }
      >
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ color: JPM_BLUE, marginBottom: 8 }}>
            Select Asset Type
          </Title>
          <Radio.Group
            value={assetType}
            onChange={(e) => handleAssetTypeChange(e.target.value)}
            style={{ width: "100%", marginBottom: 16 }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {assetTypes.map((type) => (
                <Radio.Button
                  key={type.value}
                  value={type.value}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: "44px",
                    marginBottom: "8px",
                    background:
                      assetType === type.value ? JPM_GRADIENT : "#f6f9fb",
                    color: assetType === type.value ? "#fff" : JPM_BLUE,
                    fontWeight: 600,
                    border: "none",
                  }}
                >
                  {type.label}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>

          <Title level={4} style={{ color: JPM_BLUE, marginBottom: 8 }}>
            Asset Code
          </Title>
          <Input
            style={{ width: "100%", marginBottom: 16, marginTop: 8 }}
            placeholder="For example: BTC-USD, AAPL, EURUSD=X"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          {showAssetList && assetType && (
            <div
              style={{ marginBottom: 16, maxHeight: 220, overflowY: "auto" }}
            >
              <Text style={{ color: JPM_BLUE }}>Asset reference list:</Text>
              <List
                grid={{ gutter: 12, column: 4 }}
                dataSource={assetLists[assetType as keyof typeof assetLists]}
                renderItem={(item) => (
                  <List.Item>
                    <Button
                      type={symbol === item ? "primary" : "default"}
                      onClick={() => handleAssetSelect(item)}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        borderRadius: 8,
                        background: symbol === item ? JPM_GRADIENT : "#f6f9fb",
                        color: symbol === item ? "#fff" : JPM_BLUE,
                        fontWeight: 500,
                        border: "none",
                      }}
                    >
                      <Tag color={symbol === item ? "geekblue" : "blue"}>
                        {item}
                      </Tag>
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          )}

          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/")}
              style={{
                height: "44px",
                background: "#fff",
                color: JPM_BLUE,
                fontWeight: 700,
                border: `1px solid ${JPM_BLUE}`,
                borderRadius: 8,
                minWidth: 100,
              }}
            >
              Back
            </Button>

            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                flex: 1,
                height: "44px",
                background: JPM_GRADIENT,
                border: "none",
                fontWeight: 700,
                fontSize: 16,
                minWidth: 140,
              }}
            >
              Start Analysis
            </Button>
          </div>
        </div>
      </Card>

      {/* Bottom Grids */}
      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        {/* J.P. Morgan Financial Advisor grid (takes more space) */}
        <Col xs={24} md={8}>
          <Card
            style={{
              background: gridBgColors[0],
              border: "none",
              borderRadius: 16,
              color: JPM_BLUE,
              minHeight: 260,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            bodyStyle={{ padding: 32, height: "100%" }}
          >
            <UserOutlined
              style={{ fontSize: 64, color: GOLD, marginBottom: 12 }}
            />
            <Title level={4} style={{ color: JPM_BLUE, margin: "12px 0 0 0" }}>
              J.P. Morgan Financial Advisor
            </Title>
            {/* <Paragraph
              style={{ color: HIGHLIGHT, fontSize: 14, margin: "18px 0 0 0" }}
            >
              <b>
                Unlock the power of institutional-grade trading with expert
                guidance.
              </b>
              <span
                style={{ color: JPM_BLUE, display: "block", marginTop: 16 }}
              >
                Personalized strategies, global market insights, and dedicated
                support for your institution.
              </span>
            </Paragraph> */}

            <Paragraph>
              <span
                style={{ color: JPM_BLUE, display: "block", marginTop: 16 }}
              >
                Unlock the power of institutional-grade trading with expert
                guidance.
              </span>
            </Paragraph>

            <Button
              type="primary"
              size="large"
              style={{
                marginTop: 22,
                background: GOLD,
                color: JPM_BLUE,
                fontWeight: 700,
                border: "none",
                borderRadius: 8,
                width: 180,
              }}
              href="mailto:advisor@jpmorgan.com"
            >
              Contact Advisor
            </Button>
          </Card>
        </Col>
        {/* 2x2 grids: 2 in each row, each taking half of remaining space */}
        <Col xs={24} md={16}>
          <Row gutter={[24, 24]} style={{ height: "100%" }}>
            {/* We'll use flex column and 100% height to make both rows fill the column */}
            <Col
              xs={24}
              sm={12}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ flex: 1, display: "flex" }}>
                <Card
                  style={{
                    background: gridBgColors[1],
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    minHeight: 120,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  bodyStyle={{
                    padding: 24,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <StarFilled
                    style={{ color: GOLD, fontSize: 36, marginBottom: 10 }}
                  />
                  <Title level={5} style={{ color: JPM_BLUE, margin: 0 }}>
                    Trusted Expertise
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE, margin: "8px 0 0 0" }}>
                    Work with world-class financial advisors leveraging decades
                    of market experience.
                  </Paragraph>
                </Card>
              </div>
              <div style={{ flex: 1, display: "flex", marginTop: 24 }}>
                <Card
                  style={{
                    background: gridBgColors[3],
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    minHeight: 120,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  bodyStyle={{
                    padding: 24,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <SafetyCertificateOutlined
                    style={{ color: GOLD, fontSize: 36, marginBottom: 10 }}
                  />
                  <Title level={5} style={{ color: JPM_BLUE, margin: 0 }}>
                    Compliance & Security
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE, margin: "8px 0 0 0" }}>
                    Meet regulatory standards with transparent audit trails and
                    robust risk controls.
                  </Paragraph>
                </Card>
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ flex: 1, display: "flex" }}>
                <Card
                  style={{
                    background: gridBgColors[2],
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    minHeight: 120,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  bodyStyle={{
                    padding: 24,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <ThunderboltOutlined
                    style={{ color: GOLD, fontSize: 36, marginBottom: 10 }}
                  />
                  <Title level={5} style={{ color: JPM_BLUE, margin: 0 }}>
                    AI-Driven Efficiency
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE, margin: "8px 0 0 0" }}>
                    Automate research and reporting, reduce manual workload, and
                    accelerate decision-making.
                  </Paragraph>
                </Card>
              </div>
              <div style={{ flex: 1, display: "flex", marginTop: 24 }}>
                <Card
                  style={{
                    background:
                      "linear-gradient(135deg, #fef6e3 0%, #f9f9f6 100%)",
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    minHeight: 120,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  bodyStyle={{
                    padding: 24,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <FundProjectionScreenOutlined
                    style={{ color: GOLD, fontSize: 36, marginBottom: 10 }}
                  />
                  <Title level={5} style={{ color: JPM_BLUE, margin: 0 }}>
                    Proven Cost Savings
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE, margin: "8px 0 0 0" }}>
                    <b>
                      Save up to <span style={{ color: "BROWN" }}>40%</span> on
                      research and compliance costs
                    </b>{" "}
                    by integrating our AI platform with your operations.
                  </Paragraph>
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        open={loading}
        footer={null}
        closable={false}
        centered
        width={300}
        style={{ background: "transparent" }}
        styles={{
          body: {
            background: "rgba(26, 43, 60, 0.6)",
            backdropFilter: "blur(4px)",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
          },
        }}
      >
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 36, color: "#fff" }} spin />
          }
        />
        <div
          style={{
            color: "#fff",
            marginTop: "16px",
            fontSize: "16px",
          }}
        >
          Analyzing...
        </div>
      </Modal>
    </div>
  );
};

export default Trading;
