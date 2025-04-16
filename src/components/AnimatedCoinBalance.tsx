
import React from 'react';
import { Coins } from 'lucide-react';

interface AnimatedCoinBalanceProps {
  balance: number;
}

const AnimatedCoinBalance: React.FC<AnimatedCoinBalanceProps> = ({ balance }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 animate-neon-glow z-0 rounded-lg" />
      <div className="relative z-10 bg-black bg-opacity-80 backdrop-blur-md rounded-lg p-4 text-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out hover:scale-[1.02]">
        <div className="flex items-center">
          <Coins className="mr-2 h-5 w-5 text-purple-300" />
          <span className="text-lg">Saldo: <span className="font-semibold text-purple-300">{balance}</span> CofCoins</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes neon-glow {
          0% {
            box-shadow: 0 0 15px #4A00E0, 0 0 30px #8E2DE2, 0 0 45px #4A00E0;
          }
          50% {
            box-shadow: 0 0 25px #8E2DE2, 0 0 50px #4A00E0, 0 0 70px #8E2DE2;
          }
          100% {
            box-shadow: 0 0 15px #4A00E0, 0 0 30px #8E2DE2, 0 0 45px #4A00E0;
          }
        }

        .animate-neon-glow {
          background: linear-gradient(135deg, #4A00E0, #8E2DE2);
          filter: blur(8px);
          animation: neon-glow 6s ease-in-out infinite;
          transition: all 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default AnimatedCoinBalance;
