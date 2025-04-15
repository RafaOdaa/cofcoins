
import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-cofcoin-orange rounded-full opacity-50"></div>
                <div className="absolute inset-1 bg-cofcoin-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white">CofCoinf</span>
            </div>
            <p className="mb-4">
              Plataforma de reconhecimento e recompensa para empresas que valorizam sua cultura organizacional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">Como funciona</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">Categorias</a>
              </li>
              <li>
                <a href="#rewards" className="hover:text-white transition-colors">Recompensas</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Depoimentos</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Preços</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">Sobre nós</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Casos de sucesso</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Parceiros</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Carreira</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a href="mailto:contato@cofcoinf.com" className="hover:text-white transition-colors">
                  contato@cofcoinf.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                  +55 (11) 99999-9999
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="bg-gray-800 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-cofcoin-purple w-full"
                />
                <button className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white px-4 py-2 rounded-r-md">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CofCoinf. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
