
import React, { useEffect, useRef } from 'react';

const CircuitAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const paths = svgRef.current.querySelectorAll('path');
    
    // Add animation to each path
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      
      // Set up the starting position
      path.style.strokeDasharray = length + ' ' + length;
      path.style.strokeDashoffset = length.toString();
      
      // Trigger the animation
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = '0';
      }, 100 * index);
    });
    
  }, []);

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <svg 
        ref={svgRef}
        width="300" 
        height="200" 
        viewBox="0 0 300 200" 
        className="w-full h-full"
      >
        {/* Circuit Board Lines */}
        <path d="M20,100 L60,100 L60,50 L100,50 L100,80 L140,80 L140,30 L180,30" 
              fill="none" 
              stroke="#0d3c61" 
              strokeWidth="2" 
              className="animate-line" />
                
        <path d="M20,150 L80,150 L80,120 L120,120 L120,170 L160,170 L160,100 L200,100" 
              fill="none" 
              stroke="#25d366" 
              strokeWidth="2" 
              className="animate-line" />
                
        <path d="M200,30 L240,30 L240,80 L280,80" 
              fill="none" 
              stroke="#0d3c61" 
              strokeWidth="2" 
              className="animate-line" />
                
        <path d="M200,100 L220,100 L220,150 L270,150" 
              fill="none" 
              stroke="#25d366" 
              strokeWidth="2" 
              className="animate-line" />
        
        {/* Circuit Nodes */}
        <circle cx="60" cy="100" r="4" fill="#0d3c61" className="animate-pulse-slow" />
        <circle cx="100" cy="50" r="4" fill="#0d3c61" className="animate-pulse-slow" />
        <circle cx="140" cy="80" r="4" fill="#0d3c61" className="animate-pulse-slow" />
        <circle cx="180" cy="30" r="4" fill="#0d3c61" className="animate-pulse-slow" />
        
        <circle cx="80" cy="150" r="4" fill="#25d366" className="animate-pulse-slow" />
        <circle cx="120" cy="120" r="4" fill="#25d366" className="animate-pulse-slow" />
        <circle cx="160" cy="170" r="4" fill="#25d366" className="animate-pulse-slow" />
        <circle cx="200" cy="100" r="4" fill="#25d366" className="animate-pulse-slow" />
        
        <circle cx="240" cy="80" r="4" fill="#0d3c61" className="animate-pulse-slow" />
        <circle cx="220" cy="150" r="4" fill="#25d366" className="animate-pulse-slow" />
        
        {/* Central Data Point */}
        <rect x="135" y="80" width="30" height="30" rx="6" fill="#ffc107" className="animate-pulse-slow" />
        <text x="150" y="100" fontSize="14" fill="#333" textAnchor="middle" dominantBaseline="middle">AI</text>
      </svg>
    </div>
  );
};

export default CircuitAnimation;
