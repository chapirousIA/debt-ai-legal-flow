
import React from 'react';

interface LogoProps {
  className?: string;
  darkMode?: boolean;
}

const LogoComponent: React.FC<LogoProps> = ({ className, darkMode = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="inline-block h-6 w-0.5 bg-gray-700 mr-2"></span>
          <div className="flex flex-col">
            <span className="text-[#2d3748] text-2xl font-bold tracking-tight leading-none">PEDROSA</span>
            <div className="flex items-center">
              <span className="text-[#f59e0b] text-2xl font-bold">&</span>
              <span className="text-[#2d3748] text-2xl font-bold tracking-tight">PEIXOTO</span>
            </div>
            <span className="text-[#f59e0b] text-xs tracking-widest">A D V O G A D O S</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoComponent;
