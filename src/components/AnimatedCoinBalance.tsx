
import React, { useState } from 'react';
import { Coins, Send } from 'lucide-react';

interface AnimatedCoinBalanceProps {
  balance: number;
  availableToSend?: number;
}

const AnimatedCoinBalance: React.FC<AnimatedCoinBalanceProps> = ({ 
  balance, 
  availableToSend = balance 
}) => {
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
      <div className="relative z-10 text-white">
        <div className="flex items-center mb-2">
          <Coins className="mr-2 h-5 w-5" />
          <span className="text-lg font-semibold">Saldo Total</span>
        </div>
        <div className="text-2xl font-bold mb-3">{balance} CofCoins</div>
        
        <div className="border-t border-white/20 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Send className="mr-2 h-4 w-4" />
              <span className="text-sm">Disponível para envio:</span>
            </div>
            <span className="font-semibold">{availableToSend} CofCoins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCoinBalance;
