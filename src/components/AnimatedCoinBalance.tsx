
import React, { useEffect, useRef } from 'react';
import { Coins } from 'lucide-react';

interface AnimatedCoinBalanceProps {
  balance: number;
}

const AnimatedCoinBalance: React.FC<AnimatedCoinBalanceProps> = ({ balance }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create animation for the glow
    const container = containerRef.current;
    if (!container) return;
    
    let animationFrameId: number;
    let angle = 0;
    
    const animate = () => {
      angle = (angle + 0.01) % (Math.PI * 2);
      
      // Move the glow around in a circular pattern
      const x = 50 + Math.cos(angle) * 5;
      const y = 50 + Math.sin(angle) * 5;
      
      if (container) {
        container.style.setProperty('--glow-position-x', `${x}%`);
        container.style.setProperty('--glow-position-y', `${y}%`);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative group overflow-hidden"
      style={{
        '--glow-position-x': '50%',
        '--glow-position-y': '50%'
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-70"
        style={{
          background: 'radial-gradient(circle at var(--glow-position-x) var(--glow-position-y), rgba(138, 43, 226, 0.7) 0%, rgba(74, 0, 224, 0.3) 40%, transparent 70%)',
          filter: 'blur(12px)',
          transition: 'all 0.3s',
        }}
      />
      
      <div className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white p-4 rounded-2xl flex items-center justify-center transition-all duration-500 ease-in-out relative border border-purple-500/30 shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transform">
        <div className="absolute inset-0 bg-[#4A00E0] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm">
            <Coins className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-white/80 text-sm">Saldo</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">{balance}</span>
              <span className="text-white/90">CofCoins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCoinBalance;
