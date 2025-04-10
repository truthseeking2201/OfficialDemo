
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Hexagon, CircleDollarSign, Sparkles, Globe, Layers, Star, ShieldCheck } from 'lucide-react';
import HeroAnimationBackground from './HeroAnimationBackground';
import { fadeIn, staggerFadeIn } from '@/lib/animations';
import AnimatedVisuals from './AnimatedVisuals';

const HeroSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Execute staggered animations on component mount
    const statsElements = statsRef.current?.querySelectorAll('.stat-item');
    
    // Animate the badge with a slight delay
    if (badgeRef.current) {
      fadeIn(badgeRef.current, 800, 0);
    }
    
    // Animate the icon with a slight delay
    if (iconRef.current) {
      fadeIn(iconRef.current, 1000, 100);
    }
    
    // Animate the heading with a slight delay
    if (headingRef.current) {
      fadeIn(headingRef.current, 1000, 200);
    }
    
    // Animate the subheading with a slight delay
    if (subHeadingRef.current) {
      fadeIn(subHeadingRef.current, 1000, 400);
    }
    
    // Animate the buttons with a slight delay
    if (buttonsRef.current) {
      fadeIn(buttonsRef.current, 1000, 600);
    }
    
    // Staggered animation for stats
    if (statsElements) {
      staggerFadeIn(statsElements, 150, 1000);
    }
  }, []);

  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Animated Background */}
      <HeroAnimationBackground />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div ref={badgeRef} className="flex items-center mb-6 gap-3 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-lg transform opacity-0">
            <div ref={iconRef} className="relative group">
              <Hexagon className="w-5 h-5 text-nova" />
              <div className="absolute inset-0 bg-nova/30 rounded-md blur-md opacity-70 animate-pulse"></div>
            </div>
            <span className="text-sm font-medium flex items-center gap-2">
              Next-Gen DeFi Protocol
              <Sparkles className="w-3 h-3 text-nova inline-block animate-pulse" />
            </span>
          </div>
          
          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0">
            <span className="text-gradient block mb-2">Smart DeFi Solutions</span>
            <span className="text-gradient-nova relative group block">
              Powered by 
              <span className="relative inline-block ml-2 group-hover:animate-pulse-glow transition-all duration-300">
                AI
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-nova/80 via-nova to-nova/80"></span>
              </span>
              <Star className="w-5 h-5 text-nova inline-block ml-2 animate-pulse opacity-80" />
            </span>
          </h1>
          
          <p ref={subHeadingRef} className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 opacity-0">
            <span className="backdrop-blur-sm bg-white/5 px-3 py-1 rounded-md">
              Automate your investments with cutting-edge AI strategies designed for 
              consistent returns in the evolving crypto landscape.
            </span>
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-6 opacity-0">
            <Button 
              className="btn-gradient-nova px-8 py-6 rounded-md relative overflow-hidden group shadow-lg shadow-nova/20"
              asChild
            >
              <Link to="/dashboard">
                <span className="relative z-10 flex items-center gap-2 text-base">
                  Launch App 
                  <CircleDollarSign className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <AnimatedVisuals type="particles" count={10} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
            <Link 
              to="/vaults" 
              className="group flex items-center gap-2 py-2 text-white hover:text-nova transition-all duration-300"
            >
              <span className="relative">
                View Available Vaults
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nova group-hover:w-full transition-all duration-300"></span>
              </span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div ref={statsRef} className="mt-16 glass-card rounded-2xl p-6 max-w-3xl w-full shadow-lg shadow-nova/5 card-hover-effect backdrop-blur-md">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center relative stat-item group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-nova to-nova/50 opacity-90 shadow-md">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center justify-center group pt-6">
                  <span className="mr-1">$27</span>
                  <span className="relative">
                    <span className="text-nova">M+</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-nova opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-sm text-white/70">Total Value Locked</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center relative stat-item group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-orion to-orion/50 opacity-90 shadow-md">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 group pt-6">
                  <span className="relative">
                    <span>7.8%</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-orion opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-sm text-white/70">Avg. Monthly Return</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center stat-item group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-aero to-aero/50 opacity-90 shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-aero mb-1 group pt-6">
                  <span className="relative">
                    <span>100%</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-aero opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-sm text-white/70">On-chain Transparency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
