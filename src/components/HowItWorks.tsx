
import React from 'react';
import { Award, Coins, CheckSquare } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Ganhe CofCoins",
    description: "Colaboradores ganham CofCoins por atitudes reconhecidas pelos colegas.",
    icon: Award,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Aprovação de Líderes",
    description: "Reconhecimentos são avaliados e aprovados por líderes na plataforma.",
    icon: CheckSquare,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Troque por Recompensas",
    description: "As moedas são trocadas por recompensas exclusivas na plataforma.",
    icon: Coins,
    color: "bg-cofcoin-orange/20 text-cofcoin-orange",
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Como Funciona</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma plataforma simples e intuitiva para reconhecer e recompensar os talentos da sua empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              {/* Connecting line between steps */}
              {step.id < steps.length && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-cofcoin-purple/50 to-cofcoin-orange/50 transform -translate-x-1/2 z-0"></div>
              )}
              
              <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 relative z-10 h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-cofcoin-purple/30 group">
                <div className="flex flex-col items-center">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <span className="w-8 h-8 rounded-full bg-cofcoin-purple-dark text-white flex items-center justify-center font-bold text-sm mb-4 transition-all duration-300 group-hover:bg-cofcoin-orange">
                    {step.id}
                  </span>
                  
                  <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-cofcoin-purple transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
