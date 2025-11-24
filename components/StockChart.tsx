
import React from 'react';

interface Props {
  data: number[];
  color: string; // 'green' | 'red'
  width?: number;
  height?: number;
}

export const StockChart: React.FC<Props> = ({ data, color, width = 100, height = 40 }) => {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  // Normalize points to SVG coordinate space
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height; // Invert Y because SVG 0 is top
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = color === 'green' ? '#22c55e' : '#ef4444'; // Tailwind green-500 / red-500
  const fillColor = color === 'green' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
      {/* Area Fill */}
      <path 
        d={`M 0,${height} L 0,${height - ((data[0] - min)/range)*height} ${points} L ${width},${height} Z`} 
        fill={fillColor} 
        stroke="none"
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
