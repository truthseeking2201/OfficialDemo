
import React, { useEffect, useRef } from 'react';
import { Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color,
  index
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('show');
              observer.unobserve(entry.target);
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`feature-card-highlight glass-card p-6 rounded-xl border border-white/10 hover:border-${color} transition-all duration-300 hover:-translate-y-1 opacity-0 transform translate-y-4 card-hover-effect`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-${color}/20 text-${color} relative group`}>
        {icon}
        <span className={`absolute -inset-1 rounded-full bg-${color}/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300`}></span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
      
      <div className="mt-6 hidden group-hover:flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors">
        <span>Learn more</span>
        <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add CSS to showcase the cards
    const style = document.createElement('style');
    style.innerHTML = `
      .feature-card-highlight.show {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="py-16 px-6 md:px-12 relative overflow-hidden" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-nova/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-aero/50 to-transparent"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 animated-bg opacity-30"></div>
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-nova/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="text-gradient relative">
              Powered by Advanced AI
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-nova/50 to-transparent"></span>
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-4">
            Our intelligent algorithms analyze market conditions and execute strategies with precision 
            for optimal returns in any environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Shield className="w-6 h-6" />}
            title="Enhanced Security"
            description="Multi-layer security with advanced encryption ensuring your assets remain protected at all times."
            color="nova"
            index={0}
          />
          
          <FeatureCard 
            icon={<Zap className="w-6 h-6" />}
            title="Real-Time Analysis"
            description="AI-powered analytics provide instant insights and execute trades with millisecond precision."
            color="orion"
            index={1}
          />
          
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Optimized Returns"
            description="Smart contract automation finds the highest yields across multiple protocols and chains."
            color="aero"
            index={2}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
