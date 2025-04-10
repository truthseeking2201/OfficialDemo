
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Rocket, ExternalLink, ChevronRight } from 'lucide-react';

const CtaSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Mouse movement effect for the background
  useEffect(() => {
    if (!sectionRef.current || !isVisible) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (clientX - centerX) * 0.01;
      const moveY = (clientY - centerY) * 0.01;
      
      const glowElements = section.querySelectorAll('.glow-bg');
      glowElements.forEach((el: Element) => {
        const element = el as HTMLElement;
        element.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  return (
    <div className="py-20 px-6 md:px-12 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="glow-bg absolute top-1/3 right-1/4 w-64 h-64 bg-nova/30 rounded-full blur-[120px] -z-10 transition-transform duration-700"></div>
      <div className="glow-bg absolute bottom-1/3 left-1/4 w-72 h-72 bg-orion/20 rounded-full blur-[120px] -z-10 transition-transform duration-700"></div>
      
      {/* Hexagon grid background */}
      <div className="absolute inset-0 opacity-5 animated-bg">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute transition-transform duration-700" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.5 + 0.3,
              transitionDelay: `${i * 0.2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Floating dots */}
      <div className="absolute left-1/4 top-1/4 glow-dot" style={{animationDelay: '0s'}}></div>
      <div className="absolute right-1/4 bottom-1/4 glow-dot" style={{animationDelay: '0.7s'}}></div>
      <div className="absolute left-2/3 top-1/3 glow-dot" style={{animationDelay: '1.4s'}}></div>
      
      <div className="container mx-auto max-w-4xl">
        <div className={`glass-card p-10 md:p-14 rounded-3xl border border-white/10 backdrop-blur-xl text-center relative overflow-hidden transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-nova via-orion to-aero"></div>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-nova/30 rounded-full blur-[80px]"></div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-aero/20 rounded-full blur-[80px]"></div>
          
          {/* Shimmer effect across the top */}
          <div className="absolute top-0 left-0 right-0 h-12 shimmer-effect"></div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <span className="text-gradient">Ready to Experience the Future of DeFi?</span>
          </h2>
          
          <p className={`text-lg text-white/80 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Join thousands of investors already using NODO AI's intelligent strategies to maximize returns while minimizing risks.
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-6 transition-all duration-700 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Button 
              className="btn-gradient-nova px-8 py-6 rounded-xl shadow-lg shadow-nova/20 group relative overflow-hidden"
              asChild
            >
              <Link to="/dashboard" className="flex items-center justify-center gap-2 text-lg">
                <Rocket className="w-5 h-5 mr-1 group-hover:animate-pulse" /> 
                <span>Launch App</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            
            <Button 
              className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-6 rounded-xl transition-all duration-300 group"
              variant="outline"
              asChild
            >
              <a 
                href="https://docs.nodoai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>View Documentation</span>
                <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
