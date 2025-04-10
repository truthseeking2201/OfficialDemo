
import React, { useEffect, useRef, useState } from 'react';
import AnimatedVisuals from './AnimatedVisuals';
import { Button } from './ui/button';
import { 
  fadeIn, 
  fadeOut, 
  staggerFadeIn, 
  countUp, 
  pulseGlow,
  floatingElement,
  drawSVGPath,
  animateGradient,
  textScramble
} from '@/lib/animations';
import { Card } from './ui/card';
import { Hexagon, Circle, Square } from 'lucide-react';

const AnimationShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [activeVisual, setActiveVisual] = useState<'particles' | 'wave' | 'hexagons' | 'circles' | 'lines'>('particles');
  
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initial animation
    fadeIn('.showcase-item', 800, 300);
  }, []);
  
  useEffect(() => {
    // Reset and animate when section changes
    if (activeSection === 'stats' && statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-value');
      stats.forEach((stat, i) => {
        const value = parseInt(stat.getAttribute('data-value') || '0', 10);
        countUp(stat, value, 2000);
      });
    }
    
    if (activeSection === 'icons' && iconRef.current) {
      staggerFadeIn(iconRef.current.querySelectorAll('.icon-item'), 100, 800);
      
      iconRef.current.querySelectorAll('.icon-glow').forEach((icon) => {
        pulseGlow(icon, 'rgba(249, 115, 22, 0.6)', 1500);
      });
      
      iconRef.current.querySelectorAll('.icon-float').forEach((icon) => {
        floatingElement(icon, 10);
      });
    }
    
    if (activeSection === 'text' && textRef.current) {
      textScramble(textRef.current, 'Elegant Animations', 2000);
    }
    
    if (activeSection === 'svg' && svgRef.current) {
      drawSVGPath(svgRef.current.querySelectorAll('path'), 1500);
    }
    
    if (activeSection === 'gradient' && gradientRef.current) {
      animateGradient(gradientRef.current, [
        'linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #D97706 100%)',
        'linear-gradient(135deg, #D97706 0%, #F97316 50%, #F59E0B 100%)',
        'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #F97316 100%)'
      ], 3000);
    }
  }, [activeSection]);
  
  const handleSectionChange = (section: string) => {
    fadeOut(`.${activeSection}-content`, 300, 0);
    setTimeout(() => {
      setActiveSection(section);
      fadeIn(`.${section}-content`, 800, 300);
    }, 300);
  };

  return (
    <div className="w-full">
      <Card className="glass-card mb-6 p-6 relative min-h-[500px] overflow-hidden">
        {/* Background animations */}
        <AnimatedVisuals 
          type={activeVisual} 
          color={
            activeVisual === 'particles' ? '#F97316' :
            activeVisual === 'wave' ? '#F59E0B' :
            activeVisual === 'hexagons' ? '#D97706' :
            activeVisual === 'circles' ? '#FDBA74' : '#C2410C'
          }
          count={activeVisual === 'wave' ? 1 : 30}
        />
        
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveVisual('particles')}
              className={`border-white/20 ${activeVisual === 'particles' ? 'bg-nova/20' : 'bg-transparent'}`}
            >
              Particles
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveVisual('wave')}
              className={`border-white/20 ${activeVisual === 'wave' ? 'bg-nova/20' : 'bg-transparent'}`}
            >
              Wave
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveVisual('hexagons')}
              className={`border-white/20 ${activeVisual === 'hexagons' ? 'bg-nova/20' : 'bg-transparent'}`}
            >
              Hexagons
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveVisual('circles')}
              className={`border-white/20 ${activeVisual === 'circles' ? 'bg-nova/20' : 'bg-transparent'}`}
            >
              Circles
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveVisual('lines')}
              className={`border-white/20 ${activeVisual === 'lines' ? 'bg-nova/20' : 'bg-transparent'}`}
            >
              Lines
            </Button>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Animation Showcase</h2>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSectionChange('intro')}
                className={`border-white/20 ${activeSection === 'intro' ? 'bg-nova/20' : 'bg-transparent'}`}
              >
                Intro
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSectionChange('stats')}
                className={`border-white/20 ${activeSection === 'stats' ? 'bg-nova/20' : 'bg-transparent'}`}
              >
                Stats Counter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSectionChange('icons')}
                className={`border-white/20 ${activeSection === 'icons' ? 'bg-nova/20' : 'bg-transparent'}`}
              >
                Icons
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSectionChange('text')}
                className={`border-white/20 ${activeSection === 'text' ? 'bg-nova/20' : 'bg-transparent'}`}
              >
                Text Effect
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSectionChange('svg')}
                className={`border-white/20 ${activeSection === 'svg' ? 'bg-nova/20' : 'bg-transparent'}`}
              >
                SVG Drawing
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSectionChange('gradient')}
                className={`border-white/20 ${activeSection === 'gradient' ? 'bg-nova/20' : 'bg-transparent'}`}
              >
                Gradient
              </Button>
            </div>
          </div>
          
          <div className="showcase-container min-h-[300px] flex items-center justify-center">
            {/* Intro content */}
            <div className={`intro-content transition-opacity duration-300 ${activeSection === 'intro' ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 showcase-item">Welcome to Animation Showcase</h3>
                <p className="max-w-lg mx-auto mb-6 showcase-item">
                  Explore various animation techniques using Anime.js, from simple fades to complex SVG animations.
                  Click on the buttons above to see different examples.
                </p>
                <div className="flex justify-center showcase-item">
                  <Button 
                    onClick={() => handleSectionChange('stats')} 
                    className="bg-nova hover:bg-nova/90 text-white"
                  >
                    Start Exploring
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Stats counter content */}
            <div className={`stats-content transition-opacity duration-300 ${activeSection === 'stats' ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <Card className="bg-white/10 p-6 text-center">
                  <div className="text-sm text-white/60 mb-2">Total Value Locked</div>
                  <div className="text-3xl font-bold stat-value" data-value="27000000" data-format="currency">0</div>
                </Card>
                <Card className="bg-white/10 p-6 text-center">
                  <div className="text-sm text-white/60 mb-2">Monthly Return</div>
                  <div className="text-3xl font-bold stat-value" data-value="78">0</div>
                  <div className="text-sm text-white/60">%</div>
                </Card>
                <Card className="bg-white/10 p-6 text-center">
                  <div className="text-sm text-white/60 mb-2">Active Users</div>
                  <div className="text-3xl font-bold stat-value" data-value="5280">0</div>
                </Card>
              </div>
            </div>
            
            {/* Icon animations */}
            <div className={`icons-content transition-opacity duration-300 ${activeSection === 'icons' ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div ref={iconRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                  <div className="icon-item icon-glow w-16 h-16 flex items-center justify-center bg-orion/20 rounded-full mb-4">
                    <Hexagon className="w-8 h-8 text-orion" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium">Glowing Effect</h4>
                    <p className="text-sm text-white/60">Pulsating glow animation</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="icon-item icon-float w-16 h-16 flex items-center justify-center bg-nova/20 rounded-full mb-4">
                    <Circle className="w-8 h-8 text-nova" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium">Floating Effect</h4>
                    <p className="text-sm text-white/60">Gentle hovering motion</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="icon-item w-16 h-16 flex items-center justify-center bg-aero/20 rounded-full mb-4">
                    <Square className="w-8 h-8 text-aero" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium">Fade In</h4>
                    <p className="text-sm text-white/60">Simple opacity animation</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text scramble */}
            <div className={`text-content transition-opacity duration-300 ${activeSection === 'text' ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h2 ref={textRef} className="text-4xl font-bold text-gradient-nova">Loading...</h2>
            </div>
            
            {/* SVG animation */}
            <div className={`svg-content transition-opacity duration-300 ${activeSection === 'svg' ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <svg ref={svgRef} width="300" height="300" viewBox="0 0 300 300">
                <path
                  d="M150,50 C120,50 100,80 100,110 C100,140 120,180 150,180 C180,180 200,140 200,110 C200,80 180,50 150,50 Z"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2"
                />
                <path
                  d="M100,180 C100,220 120,250 150,250 C180,250 200,220 200,180"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <path
                  d="M75,110 L100,110 M200,110 L225,110"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="2"
                />
              </svg>
            </div>
            
            {/* Gradient animation */}
            <div className={`gradient-content transition-opacity duration-300 ${activeSection === 'gradient' ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div 
                ref={gradientRef} 
                className="w-64 h-64 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #D97706 100%)',
                  backgroundSize: '200% 200%'
                }}
              ></div>
            </div>
            
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnimationShowcase;
