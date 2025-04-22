
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from 'react';

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
      className="relative group overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute top-0 right-0 p-4 flex items-center gap-1">
        <span className="font-bold text-cofcoin-orange">{coins}</span>
        <div className="h-6 w-6 rounded-full bg-cofcoin-orange/10 flex items-center justify-center">
          <span className="text-cofcoin-orange text-xs font-bold">C</span>
        </div>
      </div>

      <div className="p-6">
        <div className="w-12 h-12 mb-4 rounded-lg bg-gray-50 flex items-center justify-center text-cofcoin-purple">
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>

        <Button 
          className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white shadow-none group-hover:shadow-md transition-all duration-300"
        >
          Resgatar
        </Button>
      </div>
    </motion.div>
  );
};

export default RewardCard;
