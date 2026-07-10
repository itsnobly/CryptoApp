import { Typography, Row, Col, Tooltip, theme } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/LanguageContext';
import { useState, useMemo } from 'react';

const { Text, Title } = Typography;

const COLORS = {
  bitcoin: '#F7931A',
  ethereum: '#627EEA',
  solana: '#00D4AA',
  tether: '#26A17B',
  'binance-coin': '#F3BA2F',
  ripple: '#23292F',
  'usd-coin': '#2775CA',
  'staked-ether': '#627EEA',
  default: '#1890FF',
  others: '#8c8c8c',
};

const SEGMENT_THRESHOLD = 3;

function groupSegments(segments) {
  if (segments.length <= 8) return segments;

  const main = segments.filter((s) => s.value >= SEGMENT_THRESHOLD);
  const small = segments.filter((s) => s.value < SEGMENT_THRESHOLD);

  if (small.length === 0) return segments;

  return [
    ...main,
    {
      id: 'others',
      label: `Others (${small.length})`,
      value: Number(small.reduce((sum, s) => sum + s.value, 0).toFixed(2)),
      amount: small.reduce((sum, s) => sum + s.amount, 0),
      color: COLORS.others,
    },
  ];
}

export default function Chart() {
  const { assets } = useCrypto();
  const { t } = useLanguage();
  const [hoveredAsset, setHoveredAsset] = useState(null);
  const { token } = theme.useToken();

  const total = assets.reduce(
    (sum, asset) => sum + (asset.totalAmount || 0),
    0,
  );

  const segments = useMemo(() => {
    const chartAssets = assets.filter((asset) => asset.amount > 0);
    
    if (chartAssets.length === 0) return [];

    const raw = chartAssets.map((asset) => {
      const assetValue = asset.totalAmount || (asset.amount * (asset.currentPrice || asset.price || 1));
      const percentage = total > 0 ? (assetValue / total) * 100 : 100;
      const value = Number(Math.round((percentage + Number.EPSILON) * 100) / 100);
      return {
        id: asset.id,
        label: asset.name || asset.id,
        value: Math.max(0.1, value),
        amount: Math.max(0, assetValue),
        color: COLORS[asset.id] || COLORS.default,
      };
    });
    return groupSegments(raw);
  }, [assets, total]);

  if (segments.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Text type="secondary">{t('assets.noAssets')}</Text>
      </div>
    );
  }

  const chartData = [];
  let currentAngle = 0;
  segments.forEach((segment) => {
    const angle = (segment.value / 100) * 360;
    chartData.push({
      ...segment,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    });
    currentAngle += angle;
  });

  // Ensure full circle for single asset
  if (chartData.length === 1 && chartData[0].value === 100) {
    chartData[0].endAngle = 360;
  }

  const radius = 80;
  const cx = 100;
  const cy = 100;

  const polarToCartesian = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad - Math.PI / 2),
      y: cy + radius * Math.sin(rad - Math.PI / 2),
    };
  };

  const arcPath = (startAngle, endAngle) => {
    // Handle full circle case
    if (endAngle - startAngle >= 359.9) {
      return [
        `M ${cx} ${cy - radius}`,
        `A ${radius} ${radius} 0 1 1 ${cx} ${cy + radius}`,
        `A ${radius} ${radius} 0 1 1 ${cx} ${cy - radius}`,
        `Z`,
      ].join(' ');
    }
    
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`,
      `Z`,
    ].join(' ');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Title level={4} style={{ margin: 0 }}>
        {t('dashboard.portfolioDistribution')}
      </Title>

      <Row gutter={[32, 24]} align="middle">
        <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 220, height: 220 }}>
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
              {chartData.map((segment) => (
                <g
                  key={segment.id}
                  onMouseEnter={() => setHoveredAsset(segment.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                  opacity={
                    hoveredAsset === null || hoveredAsset === segment.id ? 1 : 0.5
                  }>
                  <path
                    d={arcPath(segment.startAngle, segment.endAngle)}
                    fill={segment.color}
                    stroke={token.colorBgContainer}
                    strokeWidth="2"
                  />
                </g>
              ))}
            </svg>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="chart-legend">
            {segments.map((segment) => (
              <Tooltip key={segment.id} title={`$${segment.amount.toFixed(2)}`}>
                <div
                  onMouseEnter={() => setHoveredAsset(segment.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  className="chart-legend-item"
                  style={{
                    background:
                      hoveredAsset === segment.id
                        ? `${segment.color}15`
                        : 'transparent',
                    borderColor:
                      hoveredAsset === segment.id ? segment.color : 'transparent',
                  }}>
                  <div className="chart-legend-label">
                    <span
                      className="chart-legend-dot"
                      style={{ background: segment.color }}
                    />
                    <div>
                      <Text strong style={{ fontSize: 14 }}>
                        {segment.label}
                      </Text>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          ${segment.amount.toFixed(2)}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <Text strong style={{ fontSize: 14, color: segment.color }}>
                    {segment.value}%
                  </Text>
                </div>
              </Tooltip>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
