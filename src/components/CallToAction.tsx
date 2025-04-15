
import React from 'react';
import { Button } from "@/components/ui/button";
import { Award, Send, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cofcoin-purple/10 via-white to-cofcoin-orange/10 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-cofcoin-purple/10 blur-xl"></div>
          <div className="absolute top-1/2 -right-20 h-60 w-60 rounded-full bg-cofcoin-orange/10 blur-xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Eleve o engajamento do seu time com CofCoinf</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Valorize a cultura da sua empresa, reconheça talentos e impulsione resultados com nossa plataforma completa.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Reconhecimento</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Send className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Engajamento</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <span>Valorização</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3 lg:pl-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4">Comece agora</h3>
                  <p className="text-gray-600 mb-6">
                    Entre em contato e teste o CofCoinf com sua equipe.
                  </p>
                  <Button className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
                    Solicitar demonstração
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
