
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Radio } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="relative z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-cofcoin-orange rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-1 bg-cofcoin-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">CofCoin</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-cofcoin-purple transition-colors">
              Home
            </Link>
            <a href="#how-it-works" className="text-gray-700 hover:text-cofcoin-purple transition-colors">
              Como Funciona
            </a>
            <a href="#categories" className="text-gray-700 hover:text-cofcoin-purple transition-colors">
              Categorias
            </a>
            <a href="#rewards" className="text-gray-700 hover:text-cofcoin-purple transition-colors">
              Recompensas
            </a>
            <div className="relative flex items-center opacity-50 cursor-not-allowed">
              <Radio className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Pulso</span>
              <span className="ml-2 bg-cofcoin-orange text-white text-xs px-2 py-1 rounded-full animate-pulse">
                Em breve
              </span>
            </div>
            <div className="ml-4 flex items-center">
              <Button
                size="sm"
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
                variant="default"
                onClick={handleLoginClick}
              >
                Acessar Plataforma
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              size="sm"
              className="mr-2 bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
              variant="default"
              onClick={handleLoginClick}
            >
              Entrar
            </Button>
            <button
              onClick={toggleMobileMenu}
              className="ml-2 text-gray-500 hover:text-cofcoin-purple focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-cofcoin-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#how-it-works"
              className="block text-gray-700 hover:text-cofcoin-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </a>
            <a
              href="#categories"
              className="block text-gray-700 hover:text-cofcoin-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categorias
            </a>
            <a
              href="#rewards"
              className="block text-gray-700 hover:text-cofcoin-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recompensas
            </a>
            <div className="flex items-center opacity-50 cursor-not-allowed">
              <Radio className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Pulso</span>
              <span className="ml-2 bg-cofcoin-orange text-white text-xs px-2 py-1 rounded-full animate-pulse">
                Em breve
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
              variant="default"
              onClick={handleLoginClick}
            >
              Acessar Plataforma
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
