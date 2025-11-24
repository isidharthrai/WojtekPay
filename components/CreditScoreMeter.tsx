import React from 'react';

interface Props {
  score: number;
}

export const CreditScoreMeter: React.FC<Props> = ({ score }) => {
  // Score range 300 - 900
  const percentage = Math.min(Math.max((score - 300) / (900 - 300), 0), 1);
  const angle = percentage * 180; // 0 to 180 degrees

  let status = "Poor";
  let color = "#ef4444"; // red
  if (score > 650) { status = "Fair"; color = "#eab308"; } // yellow
  if (score > 750) { status = "Good"; color = "#22c55e"; } // green
  if (score > 800) { status = "Excellent"; color = "#3b82f6"; } // blue

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative w-64 h-32 overflow-hidden mb-4">
        {/* Background Arc */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[24px] border-gray-200 dark:border-gray-700 box-border"></div>
        
        {/* Needle Wrapper - Rotates */}
        <div 
            className="absolute top-0 left-0 w-64 h-64 rounded-full border-[24px] border-transparent border-t-blue-500 transition-transform duration-1000 ease-out origin-center"
            style={{ 
                transform: `rotate(${angle - 135}deg)`, // Adjusting simpler CSS rotation logic
                borderColor: `transparent transparent ${color} transparent`
            }} 
        >
        </div>
        
        {/* SVG Implementation for better gradient arc control */}
        <svg viewBox="0 0 200 100" className="absolute top-0 left-0 w-full h-full">
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e5e7eb" strokeWidth="20" className="dark:stroke-gray-700" />
            <path 
                d="M 20 100 A 80 80 0 0 1 180 100" 
                fill="none" 
                stroke={color} 
                strokeWidth="20" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * percentage)}
                className="transition-[stroke-dashoffset] duration-1000 ease-out"
            />
        </svg>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gray-800 dark:bg-white rounded-full z-10"></div>
      </div>
      
      <div className="text-center mt-2">
        <h2 className="text-4xl font-bold dark:text-white" style={{ color }}>{score}</h2>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">{status}</p>
      </div>
    </div>
  );
};