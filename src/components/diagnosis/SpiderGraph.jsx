import { useMemo } from 'react';

const SpiderGraph = ({ labels = [], values = [], maxValue = 5, size = 400 }) => {
  const padding = 80;
  const chartSize = size - padding * 2;
  const center = chartSize / 2 + padding;
  const radius = chartSize / 2 * 0.88;

  const points = useMemo(() => {
    if (!labels.length || !values.length) return [];
    const n = labels.length;
    const angleStep = (2 * Math.PI) / n;
    return labels.map((_, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const r = ((values[i] ?? 0) / maxValue) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        label: labels[i],
        value: values[i],
      };
    });
  }, [labels, values, maxValue, radius, center]);

  const gridPoints = useMemo(() => {
    if (!labels.length) return [];
    const n = labels.length;
    const angleStep = (2 * Math.PI) / n;
    const levels = 5;
    return Array.from({ length: levels }, (_, level) => {
      const r = ((level + 1) / levels) * radius;
      return Array.from({ length: n + 1 }, (_, i) => {
        const angle = -Math.PI / 2 + (i % n) * angleStep;
        return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
      });
    });
  }, [labels, radius, center]);

  const axisEndpoints = useMemo(() => {
    if (!labels.length) return [];
    const n = labels.length;
    const angleStep = (2 * Math.PI) / n;
    return labels.map((_, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      };
    });
  }, [labels, radius, center]);

  const labelPositions = useMemo(() => {
    if (!labels.length) return [];
    const n = labels.length;
    const angleStep = (2 * Math.PI) / n;
    const labelRadius = radius + 36;
    return labels.map((label, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      return {
        x: center + labelRadius * Math.cos(angle),
        y: center + labelRadius * Math.sin(angle),
        label,
        value: values[i] ?? 0,
        angle: (angle * 180) / Math.PI,
      };
    });
  }, [labels, values, radius, center]);

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid polygons */}
          {gridPoints.map((ring, i) => (
            <polygon
              key={i}
              points={ring.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="rgba(96, 165, 250, 0.5)"
              strokeWidth="2"
            />
          ))}
          {/* Axis lines */}
          {axisEndpoints.map((ep, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={ep.x}
              y2={ep.y}
              stroke="rgba(96, 165, 250, 0.55)"
              strokeWidth="2"
            />
          ))}
          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(96, 165, 250, 0.4)"
            stroke="rgb(96, 165, 250)"
            strokeWidth="3"
          />
          {/* Labels on chart */}
          {labelPositions.map((lp, i) => (
            <g key={i} transform={`translate(${lp.x}, ${lp.y})`}>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                style={{ fontSize: '12px', fontWeight: 600 }}
              >
                {lp.label}
              </text>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                dy="14"
                fill="rgb(96, 165, 250)"
                style={{ fontSize: '13px', fontWeight: 700 }}
              >
                {lp.value}/{maxValue}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SpiderGraph;
