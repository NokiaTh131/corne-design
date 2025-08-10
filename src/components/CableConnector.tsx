import React from 'react';

interface CableConnectorProps {
  cableColor: string;
  className?: string;
}

export const CableConnector: React.FC<CableConnectorProps> = ({ cableColor, className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={cableColor} />
            <stop offset="50%" stopColor={lightenColor(cableColor, 20)} />
            <stop offset="100%" stopColor={cableColor} />
          </linearGradient>
        </defs>
        
        <path
          d="M 10 30 Q 30 10 60 30 Q 90 50 110 30"
          stroke="url(#cableGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        <circle
          cx="10"
          cy="30"
          r="6"
          fill={darkenColor(cableColor, 20)}
          className="drop-shadow-sm"
        />
        
        <circle
          cx="110"
          cy="30"
          r="6"
          fill={darkenColor(cableColor, 20)}
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  );
};

function lightenColor(color: string, percent: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

function darkenColor(color: string, percent: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
  const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
  const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}