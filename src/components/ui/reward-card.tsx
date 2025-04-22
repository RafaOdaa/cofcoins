
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from 'react';
import { Gift } from "lucide-react";

interface RewardCardProps {
  title: string;
  description: string;
  coins: number;
  icon: React.ReactNode;
  index: number;
}

const RewardCard = ({ title, description, coins, icon, index }: RewardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Coin badge */}
      <div className="absolute -right-2 -top-2">
        <div className="relative">
          <div className="absolute inset-0 bg-cofcoin-orange/20 rounded-full blur-sm transform scale-110"></div>
          <div className="relative bg-cofcoin-orange text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
            {coins} C
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Icon container */}
        <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-cofcoin-purple/10 to-cofcoin-orange/10">
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>

        {/* Action button */}
        <Button 
          className="w-full bg-gradient-to-r from-cofcoin-purple to-cofcoin-orange hover:from-cofcoin-purple-dark hover:to-cofcoin-orange-dark text-white font-medium shadow-none group-hover:shadow-lg transition-all duration-300 border-0"
        >
          <Gift className="w-4 h-4 mr-2" />
          Resgatar Recompensa
        </Button>
      </div>
    </motion.div>
  );
};

export default RewardCard;
