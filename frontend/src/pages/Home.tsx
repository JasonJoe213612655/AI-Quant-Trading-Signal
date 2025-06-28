import React, { useEffect } from "react";
import { Card, Typography, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const JPM_BLUE = "#003366";
const JPM_GRADIENT = "linear-gradient(90deg, #003366 0%, #00539B 100%)";
const JPM_GRADIENT_2 =
  "linear-gradient(90deg, rgb(40, 78, 120) 0%, rgb(70, 110, 170) 60%, rgb(90, 120, 160) 100%)";

const GOLD = "#FFD700";

const gridBgColors = [
  "linear-gradient(135deg,rgb(212, 202, 151) 0%, #f9f9f6 100%)", // Soft yellow/cream
  "linear-gradient(135deg,rgb(177, 213, 204) 0%, #f6f9fb 100%)", // Soft teal
  "linear-gradient(135deg,rgb(210, 195, 218) 0%, #f9f6ff 100%)", // Soft purple
  "linear-gradient(135deg,rgb(162, 181, 203) 0%, #f6f9fb 100%)", // Soft blue
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: JPM_GRADIENT,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Row gutter={[32, 22]}>
        <Col span={24}>
          <Card
            style={{
              background: JPM_GRADIENT_2,
              border: "none",
              borderRadius: 18,
              boxShadow: "0 6px 32px rgba(0,0,0,0.12)",
              textAlign: "center",
            }}
            bodyStyle={{ padding: "36px 12px 28px 12px" }}
          >
            <Title
              level={1}
              style={{
                color: GOLD,
                textShadow: "0 0 18px rgba(255,215,0,0.3)",
                fontWeight: 800,
                letterSpacing: 2,
                marginBottom: 0,
              }}
            >
              ChaseQuant AI Analyst
            </Title>
            <Paragraph
              style={{
                color: "#fff",
                fontSize: 20,
                marginTop: 12,
                marginBottom: 0,
                opacity: 0.9,
              }}
            >
              Empowering JPMorgan Institutional Trading with AI-driven Insights
            </Paragraph>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            style={{
              background: "#fff",
              border: "none",
              borderRadius: 18,
              height: "45vh",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            }}
            bodyStyle={{ padding: 0, height: "100%" }}
          >
            {/* Animated grid background */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage:
                  "linear-gradient(rgba(0,83,155,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,83,155,0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                animation: "gridMove 20s linear infinite",
                zIndex: 1,
              }}
            />
            {/* Data flow effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,83,155,0.10), transparent)",
                animation: "dataFlow 3s linear infinite",
                zIndex: 2,
              }}
            />
            {/* Price fluctuation line */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                animation: "priceWave 2s ease-in-out infinite",
                zIndex: 3,
              }}
            />
            {/* Trading indicators */}
            <div
              style={{
                position: "absolute",
                top: "28%",
                left: "18%",
                fontSize: "22px",
                color: GOLD,
                animation: "indicatorPulse 2s infinite",
                zIndex: 4,
                fontWeight: 600,
              }}
            >
              📈 RSI: 65
            </div>
            <div
              style={{
                position: "absolute",
                top: "40%",
                right: "18%",
                fontSize: "22px",
                color: GOLD,
                animation: "indicatorPulse 2s infinite 0.5s",
                zIndex: 4,
                fontWeight: 600,
              }}
            >
              📊 MACD: 0.25
            </div>
            <div
              style={{
                position: "absolute",
                top: "54%",
                left: "18%",
                fontSize: "22px",
                color: GOLD,
                animation: "indicatorPulse 2s infinite 1s",
                zIndex: 4,
                fontWeight: 600,
              }}
            >
              📉 KDJ: 45
            </div>
            {/* Trading signal */}
            <div
              style={{
                position: "absolute",
                top: "62%",
                right: "18%",
                fontSize: "22px",
                color: GOLD,
                animation: "signalGlow 2s infinite",
                zIndex: 4,
                fontWeight: 600,
              }}
            >
              💡 Buy Signal
            </div>
            {/* Center Title */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "40px",
                color: JPM_BLUE,
                textShadow: `0 0 18px ${GOLD}, 0 0 8px #fff`,
                animation: "titleGlow 2s infinite",
                zIndex: 5,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              AI Powered Trade Analyst by Chase
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card
                hoverable
                style={{
                  background: JPM_GRADIENT_2,
                  border: "none",
                  borderRadius: 16,
                  height: "210px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 2px 12px rgba(0,83,155,0.10)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onClick={() => navigate("/trading")}
              >
                <Title level={3} style={{ color: GOLD, marginBottom: 8 }}>
                  Chase Quant Trading Analysis
                </Title>
                <Paragraph
                  style={{ color: "#fff", textAlign: "center", fontSize: 16 }}
                >
                  Select asset type, input trading pair, generate professional
                  trading analysis by AI
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: "20px",
                    background: GOLD,
                    color: JPM_BLUE,
                    fontWeight: 700,
                    border: "none",
                    borderRadius: 8,
                  }}
                >
                  Start Analysis
                </Button>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                hoverable
                style={{
                  background: JPM_GRADIENT_2,
                  border: "none",
                  borderRadius: 16,
                  height: "210px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 2px 12px rgba(0,83,155,0.10)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onClick={() => navigate("/report")}
              >
                <Title level={3} style={{ color: GOLD, marginBottom: 8 }}>
                  Quant AI Analysis Report
                </Title>
                <Paragraph
                  style={{ color: "#fff", textAlign: "center", fontSize: 16 }}
                >
                  View historical trading records, analyze trading performance,
                  optimize trading strategies by AI
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: "20px",
                    background: GOLD,
                    color: JPM_BLUE,
                    fontWeight: 700,
                    border: "none",
                    borderRadius: 8,
                  }}
                >
                  View Report
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card
            style={{
              background: "#fff",
              border: "none",
              borderRadius: 16,
              marginTop: 16,
              boxShadow: "0 2px 12px rgba(0,83,155,0.08)",
            }}
            bodyStyle={{ padding: "32px 24px" }}
          >
            <Title level={3} style={{ color: JPM_BLUE, marginBottom: 24 }}>
              Supported Functionality & Future Scope
            </Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={6}>
                <Card
                  style={{
                    background: gridBgColors[0],
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  bodyStyle={{
                    minHeight: 180,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Title level={4} style={{ color: JPM_BLUE }}>
                    Global Asset Class
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE }}>
                    Seamlessly access a wide range of global assets - including
                    stocks, ETFs, forex, <b>JPM Coin</b> & cryptocurrencies —
                    all within the trusted Chase ecosystem. Empower your
                    institutional trading with the security and innovation of
                    JPMorgan.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={6}>
                <Card
                  style={{
                    background: gridBgColors[1],
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  bodyStyle={{
                    minHeight: 180,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Title level={4} style={{ color: JPM_BLUE }}>
                    Chase AI Analyst Report
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE }}>
                    <Paragraph style={{ color: JPM_BLUE }}>
                      Instantly generate professional trading reports powered by
                      advanced AI analysis—delivering actionable insights and
                      strategic recommendations, all within the trusted Chase
                      platform.
                    </Paragraph>
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={6}>
                <Card
                  style={{
                    background: gridBgColors[2],
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  bodyStyle={{
                    minHeight: 180,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Title level={4} style={{ color: JPM_BLUE }}>
                    Chase App Integration
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE }}>
                    Seamlessly integrates with Chase’s suite of knowledgeable
                    applications enabling unified access to trading insights,
                    portfolio management, and financial tools within the trusted
                    Chase ecosystem.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={6}>
                <Card
                  style={{
                    background: gridBgColors[3],
                    border: "none",
                    borderRadius: 12,
                    color: JPM_BLUE,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  bodyStyle={{
                    minHeight: 180,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Title level={4} style={{ color: JPM_BLUE }}>
                    Top 100 Asset Rankings by Chase
                  </Title>
                  <Paragraph style={{ color: JPM_BLUE }}>
                    Instantly view and explore the top 100 most traded assets
                    across global markets—helping you identify trending
                    opportunities and make informed decisions, all within the
                    secure Chase platform.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* Custom CSS animations   */}
      <style>
        {`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 24px 24px; }
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
            0% { text-shadow: 0 0 5px ${GOLD}; }
            50% { text-shadow: 0 0 15px ${GOLD}; }
            100% { text-shadow: 0 0 5px ${GOLD}; }
          }
          @keyframes titleGlow {
            0% { text-shadow: 0 0 10px ${GOLD}; }
            50% { text-shadow: 0 0 24px ${GOLD}; }
            100% { text-shadow: 0 0 10px ${GOLD}; }
          }
          // .ant-card:hover {
          //   transform: translateY(-5px);
          //   box-shadow: 0 8px 24px ${GOLD}33;
          // }
        `}
      </style>
    </div>
  );
};

export default Home;
