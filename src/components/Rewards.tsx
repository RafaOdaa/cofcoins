import React from 'react';
import { Gift, Coffee, Pizza, BookOpen, Ticket, Calendar, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import RewardCard from './RewardCard';

const rewardsData = [
  {
    title: "Vale Café",
    description: "Um momento de pausa para recarregar as energias",
    coins: 100,
    icon: <Coffee className="h-8 w-8 text-amber-600" />
  },
  {
    title: "Pizza da Equipe",
    description: "Momento de confraternização com todo o time",
    coins: 300,
    icon: <Pizza className="h-8 w-8 text-red-600" />
  },
  {
    title: "Livro Escolhido",
    description: "Escolha um livro para seu desenvolvimento",
    coins: 400,
    icon: <BookOpen className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Cinema",
    description: "Ingresso para o filme de sua escolha",
    coins: 250,
    icon: <Ticket className="h-8 w-8 text-purple-600" />
  },
  {
    title: "Day Off",
    description: "Um dia de folga para descansar",
    coins: 1000,
    icon: <Calendar className="h-8 w-8 text-green-600" />
  },
  {
    title: "Badge de Destaque",
    description: "Destaque especial no perfil por 1 mês",
    coins: 150,
    icon: <BadgeCheck className="h-8 w-8 text-cofcoin-purple" />
  }
];

const Rewards = () => {
  return (
    <section id="rewards" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Recompensas</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Troque seus CofCoins acumulados por prêmios exclusivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewardsData.map((reward, index) => (
            <RewardCard
              key={index}
              title={reward.title}
              description={reward.description}
              coins={reward.coins}
              icon={reward.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rewards;
