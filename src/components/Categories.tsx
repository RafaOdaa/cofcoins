
import React from 'react';
import CategoryCard from './CategoryCard';
import { Lightbulb, Wrench, Heart, Sparkles, Shield, Eye, GraduationCap } from "lucide-react";

const categoriesData = [
  {
    title: "Fora da Caixa",
    description: "Ideias inovadoras que mudam o jogo",
    icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
    color: "bg-blue-100"
  },
  {
    title: "O Quebra Galho",
    description: "Resolve tudo com agilidade",
    icon: <Wrench className="h-8 w-8 text-gray-700" />,
    color: "bg-gray-100"
  },
  {
    title: "Aqui é MedCof!",
    description: "Age com sentimento de dono",
    icon: <Heart className="h-8 w-8 text-red-600" />,
    color: "bg-red-100"
  },
  {
    title: "Mestre do Improviso",
    description: "Brilha sem planejamento",
    icon: <Sparkles className="h-8 w-8 text-amber-600" />,
    color: "bg-amber-100"
  },
  {
    title: "Segurador de Rojão",
    description: "Traz calma e resolve crises",
    icon: <Shield className="h-8 w-8 text-green-600" />,
    color: "bg-green-100"
  },
  {
    title: "O Vidente",
    description: "Antecipação de problemas",
    icon: <Eye className="h-8 w-8 text-purple-600" />,
    color: "bg-purple-100"
  },
  {
    title: "Participou de Live",
    description: "30 CofCoins",
    icon: <Sparkles className="h-8 w-8 text-cofcoin-orange" />,
    color: "bg-cofcoin-orange/20"
  },
  {
    title: "Conclusão de curso",
    description: "50-100 CofCoins",
    icon: <GraduationCap className="h-8 w-8 text-cofcoin-purple" />,
    color: "bg-cofcoin-purple/20"
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
