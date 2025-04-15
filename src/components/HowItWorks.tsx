
import React from 'react';
import { Award, Coins, CheckSquare, LayoutDashboard } from "lucide-react";

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
    title: "Troque por Recompensas",
    description: "As moedas são trocadas por recompensas exclusivas na plataforma.",
    icon: Coins,
    color: "bg-cofcoin-orange/20 text-cofcoin-orange",
  },
  {
    id: 3,
    title: "Aprovação de Líderes",
    description: "Reconhecimentos são avaliados e aprovados por líderes na plataforma.",
    icon: CheckSquare,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Painel Centralizado",
    description: "Tudo centralizado em um painel intuitivo com todos os dados e métricas.",
    icon: LayoutDashboard,
    color: "bg-cofcoin-purple/20 text-cofcoin-purple",
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              {/* Connecting line between steps */}
              {step.id < steps.length && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-cofcoin-purple/50 to-cofcoin-orange/50 transform -translate-x-1/2 z-0"></div>
              )}
              
              <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 relative z-10 h-full hover:shadow-lg transition-all duration-300 hover:border-cofcoin-purple/20">
                <div className="flex flex-col items-center">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <span className="w-8 h-8 rounded-full bg-cofcoin-purple-dark text-white flex items-center justify-center font-bold text-sm mb-4">
                    {step.id}
                  </span>
                  
                  <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-cofcoin-orange flex items-center justify-center">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full bg-white flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>
              <span className="text-lg font-medium">Acúmulo de CofCoins em tempo real na plataforma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
