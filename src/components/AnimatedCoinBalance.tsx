
import React from 'react';
import { Coins } from 'lucide-react';

interface AnimatedCoinBalanceProps {
  balance: number;
}

const AnimatedCoinBalance: React.FC<AnimatedCoinBalanceProps> = ({ balance }) => {
  return (
    <div className="rounded-lg p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 border border-gray-200">
      <div className="flex items-center">
        <Coins className="mr-2 h-5 w-5 text-cofcoin-purple" />
        <span className="text-lg">Saldo: <span className="font-semibold text-cofcoin-purple">{balance}</span> CofCoins</span>
      </div>
    </div>
  );
};

export default AnimatedCoinBalance;
