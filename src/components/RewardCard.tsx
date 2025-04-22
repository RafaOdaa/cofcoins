
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface RewardCardProps {
  title: string;
  description: string;
  coins: number;
  icon: React.ReactNode;
  index: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ title, description, coins, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-6 w-6 rounded-full bg-cofcoin-orange flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-semibold text-lg">{coins}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <Button className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
          Resgatar
        </Button>
      </div>
    </motion.div>
  );
};

export default RewardCard;
