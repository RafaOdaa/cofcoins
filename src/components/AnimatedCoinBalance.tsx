
import React, { useState } from 'react';
import { Coins } from 'lucide-react';

interface AnimatedCoinBalanceProps {
  balance: number;
}

const AnimatedCoinBalance: React.FC<AnimatedCoinBalanceProps> = ({ balance }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="rounded-lg p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border border-gray-200"
      style={{
        background: isHovered 
          ? 'linear-gradient(135deg, #f97316 0%, #9b87f5 100%)' 
          : 'linear-gradient(135deg, #9b87f5 0%, #f97316 100%)',
        transition: 'background 0.5s ease-in-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex items-center text-white">
        <Coins className="mr-2 h-5 w-5" />
        <span className="text-lg">Saldo: <span className="font-semibold">{balance}</span> CofCoins</span>
      </div>
    </div>
  );
};

export default AnimatedCoinBalance;
