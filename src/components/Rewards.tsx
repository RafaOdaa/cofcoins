
import React from 'react';
import { Gift, Coffee, Pizza, BookOpen, Ticket, Calendar, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

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

const RewardCard = ({ title, description, coins, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            {icon}
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-cofcoin-orange flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-semibold text-lg">{coins}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <Button className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
          Resgatar
        </Button>
      </div>
    </motion.div>
  );
};

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

        <div className="mt-16 text-center">
          <div className="inline-block">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cofcoin-purple/20 to-cofcoin-orange/20 animate-pulse"></div>
              <Button size="lg" className="relative bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
                <Gift className="mr-2 h-5 w-5" />
                Ver todas as recompensas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
