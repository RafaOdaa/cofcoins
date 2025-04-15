
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
              <span className="text-xl font-bold text-gray-900">CofCoinf</span>
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
            <Button
              size="sm"
              className="ml-4 bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
              variant="default"
              onClick={() => window.location.href = '/login'}
            >
              Acessar Plataforma
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-cofcoin-purple focus:outline-none"
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
            <Button
              size="sm"
              className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
              variant="default"
              onClick={() => window.location.href = '/login'}
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
