
import React from 'react';
import { Coins } from 'lucide-react';

interface AnimatedCoinBalanceProps {
  balance: number;
}

const AnimatedCoinBalance: React.FC<AnimatedCoinBalanceProps> = ({ balance }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center">
        <Coins className="mr-2 h-5 w-5 text-cofcoin-purple" />
        <span className="text-lg">Saldo: <span className="font-semibold text-cofcoin-purple">{balance}</span> CofCoins</span>
      </div>
    </div>
  );
};

export default AnimatedCoinBalance;
