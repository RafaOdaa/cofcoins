
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Award, Gift, Coins } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-cofcoin-purple/5 animate-float"></div>
        <div className="absolute top-40 right-10 h-20 w-20 rounded-full bg-cofcoin-orange/5 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/4 h-32 w-32 rounded-full bg-cofcoin-purple/5 animate-float" style={{ animationDelay: "1.5s" }}></div>
        
        {/* Coin animations */}
        <div className="absolute top-1/4 right-1/3">
          <div className="relative h-8 w-8 rounded-full bg-cofcoin-orange shadow-lg animate-coin-flip">
            <div className="absolute inset-1 rounded-full bg-cofcoin-orange/80 flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
          </div>
        </div>
        <div className="absolute top-2/3 left-1/4">
          <div className="relative h-6 w-6 rounded-full bg-cofcoin-orange shadow-lg animate-coin-flip" style={{ animationDelay: "1s" }}>
            <div className="absolute inset-0.5 rounded-full bg-cofcoin-orange/80 flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-cofcoin-purple">Reconheça</span> talentos.
              <br />
              <span className="text-cofcoin-purple">Recompense</span> com CofCoinf.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Uma nova forma de engajar colaboradores com uma moeda interna de valorização e recompensa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
                Quero testar com meu time
              </Button>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="border-cofcoin-purple text-cofcoin-purple hover:bg-cofcoin-purple/10">
                  Entenda como funciona
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <div className="relative lg:h-[500px] flex items-center justify-center">
            {/* Illustration */}
            <div className="relative z-10 w-full max-w-lg">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cofcoin-purple/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cofcoin-orange/10 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              
              {/* Central illustration */}
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-cofcoin-purple/20">
                {/* Person 1 */}
                <div className="absolute top-4 left-4 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-cofcoin-purple/20 flex items-center justify-center mb-2">
                    <Award className="h-8 w-8 text-cofcoin-purple" />
                  </div>
                  <span className="text-sm font-medium">Reconheça</span>
                </div>
                
                {/* Person 2 */}
                <div className="absolute bottom-4 right-4 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-cofcoin-orange/20 flex items-center justify-center mb-2">
                    <Gift className="h-8 w-8 text-cofcoin-orange" />
                  </div>
                  <span className="text-sm font-medium">Recompense</span>
                </div>
                
                {/* Coins in the middle */}
                <div className="flex justify-center items-center h-32">
                  <div className="relative h-20 w-20 rounded-full bg-cofcoin-orange flex items-center justify-center shadow-lg animate-float">
                    <Coins className="h-10 w-10 text-white" />
                  </div>
                  
                  <div className="absolute">
                    <div className="h-8 w-8 rounded-full bg-cofcoin-orange/20 absolute -top-12 -left-16 animate-float" style={{ animationDelay: "0.5s" }}></div>
                    <div className="h-5 w-5 rounded-full bg-cofcoin-orange/20 absolute -bottom-10 left-10 animate-float" style={{ animationDelay: "1.2s" }}></div>
                    <div className="h-10 w-10 rounded-full bg-cofcoin-orange/20 absolute -right-20 -bottom-5 animate-float" style={{ animationDelay: "0.8s" }}></div>
                  </div>
                </div>
                
                {/* Ideas/Innovation */}
                <div className="absolute top-4 right-4 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-cofcoin-purple-light/30 flex items-center justify-center mb-2">
                    <Lightbulb className="h-8 w-8 text-cofcoin-purple-dark" />
                  </div>
                  <span className="text-sm font-medium">Inove</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
