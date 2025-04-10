
import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LineChart, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Vault Card Component
const VaultCard = ({
  name,
  type,
  icon,
  description,
  apy,
  color,
  shadow,
  highlight,
  index
}: {
  name: string;
  type: string;
  icon: React.ReactNode;
  description: string;
  apy: string;
  color: string;
  shadow: string;
  highlight?: boolean;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            entries[0].target.classList.add('card-visible');
            observer.unobserve(entries[0].target);
          }, index * 150);
        }
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
    <Card 
      className={`glass-card p-6 rounded-xl group card-hover-effect ${shadow} ${highlight ? 'border-' + color + '/30' : 'border-white/10'} transition-all duration-300 opacity-0 transform translate-y-4 vault-card`}
      ref={cardRef}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color} relative`}>
          {icon}
          <span className={`absolute -inset-1 rounded-full bg-${color.split(' ')[0]}/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300`}></span>
        </div>
        {highlight && (
          <span className={`px-3 py-1 rounded-full text-xs ${color} bg-white/10 relative overflow-hidden`}>
            Featured
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-gradient-nova transition-all duration-300">{name}</h3>
      <p className="text-white/70 text-sm mb-4">{description}</p>
      
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-sm text-white/60">Expected APY</div>
          <div className="text-lg font-bold font-mono">{apy}</div>
        </div>
        <div>
          <div className="text-sm text-white/60">Type</div>
          <div className="text-sm font-medium">{type}</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className={`w-full bg-transparent border border-white/20 hover:bg-white/10 hover:border-${color.split(' ')[1]} text-white group-hover:text-${color.split(' ')[1]} transition-all relative overflow-hidden`}
        asChild
      >
        <Link to={`/vaults`} className="flex items-center justify-center">
          <span>Learn More</span>
          <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>
      </Button>
    </Card>
  );
};

const VaultsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
      .vault-card.card-visible {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .section-title-visible {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const titleElements = entries[0].target.querySelectorAll('.section-title');
          titleElements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('section-title-visible');
            }, i * 150);
          });
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      document.head.removeChild(style);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Mouse parallax effect
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const posX = clientX - rect.left;
      const posY = clientY - rect.top;
      
      const moveX = (posX - centerX) * 0.005;
      const moveY = (posY - centerY) * 0.005;
      
      const glowElements = section.querySelectorAll('.glow-element');
      glowElements.forEach((el: Element) => {
        const element = el as HTMLElement;
        element.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
      });
    };
    
    sectionRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="py-16 px-6 md:px-12 relative" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Animated background */}
        <div className="absolute inset-0 animated-bg opacity-30"></div>
        
        {/* Glow spots */}
        <div className="glow-element absolute top-1/3 left-1/4 w-72 h-72 bg-nova/10 rounded-full blur-[150px] -z-10"></div>
        <div className="glow-element absolute bottom-1/3 right-1/4 w-80 h-80 bg-aero/10 rounded-full blur-[150px] -z-10"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="section-title opacity-0 transform translate-y-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Nodo <span className="text-gradient-nova relative">
                Vaults
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nova/40"></span>
              </span>
            </h2>
            <p className="text-white/70 max-w-xl">
              Discover our top-performing AI-powered investment vaults with institutional-grade risk management
            </p>
          </div>
          <Link 
            to="/vaults" 
            className="group flex items-center gap-2 py-2 mt-4 md:mt-0 text-white hover:text-nova transition-colors section-title opacity-0 transform translate-y-4"
          >
            <span>View All Vaults</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VaultCard
            name="NexusAI"
            type="DeFi Analyst"
            icon={<LineChart className="w-5 h-5 text-white" />}
            description="Nodo's quantitative strategy leveraging AI analytics for higher returns across DeFi protocols."
            apy="8.6% - 12.4%"
            color="bg-nova/20 text-nova"
            shadow="shadow-neon-nova"
            highlight={true}
            index={0}
          />
          
          <VaultCard
            name="CosmosYield"
            type="Yield Optimization"
            icon={<Sparkles className="w-5 h-5 text-white" />}
            description="Designed for stable returns with minimal volatility. Focused on secure yield generation."
            apy="5.8% - 8.4%"
            color="bg-aero/20 text-aero"
            shadow="shadow-neon-aero"
            index={1}
          />
          
          <VaultCard
            name="AlphaSync"
            type="Market Maker"
            icon={<TrendingUp className="w-5 h-5 text-white" />}
            description="Advanced trading strategy targeting alpha generation through sophisticated market-making algorithms."
            apy="10.2% - 15.8%"
            color="bg-orion/20 text-orion"
            shadow="shadow-neon-orion"
            index={2}
          />
        </div>
      </div>
    </div>
  );
};

export default VaultsSection;
