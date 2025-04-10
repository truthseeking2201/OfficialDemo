
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
      scrolled ? "py-2" : "py-4"
    )}>
      <nav className={cn(
        "px-6 md:px-12 backdrop-blur-md border-b transition-all duration-300",
        scrolled 
          ? "bg-nodo-darker/90 border-white/10 shadow-lg" 
          : "bg-transparent border-transparent"
      )}>
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <span className="text-xl font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity">
              NODO
              <span className="text-nova ml-0.5 relative">
                AI
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-nova/80 to-nova group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/vaults"
              className={cn(
                "text-sm transition-all duration-200 hover:text-nova relative group",
                isActive("/vaults") 
                  ? "text-nova" 
                  : "text-white/70"
              )}
            >
              <span>Vaults</span>
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-nova transition-all duration-300",
                isActive("/vaults") ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </Link>
            <a 
              href="https://docs.nodoai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 transition-all duration-200 hover:text-nova relative group"
            >
              <span>Docs</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nova group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="btn-gradient-nova text-white shadow-lg shadow-nova/20 relative overflow-hidden group"
              asChild
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                <span>Launch App</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="text-white p-2 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative h-6 w-6 transform transition-all duration-300">
                {isMenuOpen ? (
                  <X 
                    size={24} 
                    className="absolute transform transition-all duration-300 rotate-90 opacity-0 animate-in" 
                    onAnimationEnd={(e) => {
                      e.currentTarget.classList.remove("rotate-90", "opacity-0");
                    }}
                  />
                ) : (
                  <Menu 
                    size={24} 
                    className="absolute transform transition-all duration-300" 
                  />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-nodo-darker/95 backdrop-blur-lg p-6 lg:hidden z-40 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/vaults"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-nova"></div>
              <span>Vaults</span>
            </Link>
            <a 
              href="https://docs.nodoai.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-nova"></div>
              <span>Docs</span>
            </a>
            <div className="pt-6">
              <Button className="w-full btn-gradient-nova text-white" asChild>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2"
                >
                  Launch App
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
