import React from 'react';
import CategoryCard from './CategoryCard';
import { Award, Eye, Gift, Heart, Lightbulb, Shield, Wrench, BookOpen } from "lucide-react";

const categoriesData = [
  {
    title: "Fora da Caixa",
    description: "Pra quem sempre surpreende com soluções e ideias que ninguém tinha pensado, mudando o jogo e dando aquele toque criativo que faz toda a diferença.",
    icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
    color: "bg-blue-100"
  },
  {
    title: "O Quebra Galho",
    description: "Praquele parceiro que aparece rapidinho e resolve o problema sem enrolação. Quando você precisa, ele tá lá para fazer tudo se ajeitar.",
    icon: <Wrench className="h-8 w-8 text-green-600" />,
    color: "bg-green-100"
  },
  {
    title: "Aqui é MedCof!",
    description: "Pra quem age como se a empresa fosse sua casa: cuida, propõe melhorias e não deixa nada no 'deixa pra depois'. É aquele sentimento de 'se eu não fizer, ninguém faz'.",
    icon: <Heart className="h-8 w-8 text-red-600" />,
    color: "bg-red-100"
  },
  {
    title: "Mestre do Improviso",
    description: "Pra aquele que, mesmo sem planejar, sempre acha um jeito de resolver a situação e sair da enrascada.",
    icon: <Gift className="h-8 w-8 text-amber-600" />,
    color: "bg-amber-100"
  },
  {
    title: "Segurador de Rojão",
    description: "Para aquele(a) colega que chega na hora certa para domar situações explosivas e manter a paz com muita habilidade e leveza.",
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    color: "bg-purple-100"
  },
  {
    title: "O Vidente",
    description: "Praquele que, com uma visão quase sobrenatural, identifica e resolve perrengues antes mesmo de acontecerem.",
    icon: <Eye className="h-8 w-8 text-indigo-600" />,
    color: "bg-indigo-100"
  },
  {
    title: "Aprendeu por si, falou por todos",
    description: "Com uma mente inquieta e coração generoso, compartilhou um insight de leitura que virou semente em todo mundo. Uma mente curiosa que lê com propósito e compartilha com paixão.",
    icon: <BookOpen className="h-8 w-8 text-cofcoin-purple" />,
    color: "bg-cofcoin-purple/20"
  },
  {
    title: "Participou de Live",
    description: "30 CofCoins",
    icon: <Award className="h-8 w-8 text-cofcoin-orange" />,
    color: "bg-cofcoin-orange/20"
  }
];

const Categories = () => {
  return (
    <section id="categories" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Categorias de Reconhecimento</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reconheça os talentos de sua equipe através destas categorias especiais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesData.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              color={category.color}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
