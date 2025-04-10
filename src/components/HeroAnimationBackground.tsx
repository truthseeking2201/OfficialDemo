
import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { Star, Sparkles } from 'lucide-react';

const HeroAnimationBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing elements
    containerRef.current.innerHTML = '';
    
    // Create layered effects
    createHexagonGrid(containerRef.current);
    createFloatingOrbs(containerRef.current);
    createGlowingLines(containerRef.current);
    createParticlesEffect(containerRef.current);
    createStarsEffect(containerRef.current);
    
    // Create a central visual element
    createCentralElement(containerRef.current);
    
    return () => {
      // Cleanup animations when component unmounts
      anime.remove(containerRef.current?.querySelectorAll('*'));
    };
  }, []);
  
  const createHexagonGrid = (container: HTMLDivElement) => {
    const hexContainer = document.createElement('div');
    hexContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(hexContainer);
    
    // Create SVG for hexagons with improved design
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1000 800');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.style.opacity = '0.15';
    hexContainer.appendChild(svg);
    
    const hexSize = 40;
    const cols = Math.ceil(1000 / (hexSize * 1.5)) + 1;
    const rows = Math.ceil(800 / (hexSize * Math.sqrt(3))) + 1;
    
    // Generate hexagons with more sophisticated look
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexSize * 1.5;
        const y = row * hexSize * Math.sqrt(3) + (col % 2 === 0 ? 0 : hexSize * Math.sqrt(3) / 2);
        
        const hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const points = [];
        
        for (let i = 0; i < 6; i++) {
          const angle = Math.PI / 3 * i - Math.PI / 6;
          const pointX = x + hexSize * Math.cos(angle);
          const pointY = y + hexSize * Math.sin(angle);
          points.push(`${pointX},${pointY}`);
        }
        
        hex.setAttribute('points', points.join(' '));
        hex.setAttribute('fill', 'none');
        hex.setAttribute('stroke', col % 3 === 0 ? '#F97316' : (col % 3 === 1 ? '#FB923C' : '#FDBA74'));
        hex.setAttribute('stroke-width', '0.7');
        hex.setAttribute('stroke-opacity', '0.3');
        hex.setAttribute('data-x', x.toString());
        hex.setAttribute('data-y', y.toString());
        svg.appendChild(hex);
      }
    }
    
    // Enhanced animation for hexagons with more complex sequence
    anime({
      targets: svg.querySelectorAll('polygon'),
      strokeOpacity: [
        { value: 0.1, duration: 1200, easing: 'easeInOutQuad' },
        { value: 0.4, duration: 1200, easing: 'easeInOutQuad' }
      ],
      scale: [
        { value: 0.95, duration: 700, easing: 'easeOutElastic(1, .5)' },
        { value: 1, duration: 700, easing: 'easeInElastic(1, .5)' }
      ],
      delay: anime.stagger(8, { grid: [cols, rows], from: 'center' }),
      loop: true,
      direction: 'alternate'
    });
  };
  
  const createFloatingOrbs = (container: HTMLDivElement) => {
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(orbsContainer);
    
    // Create floating orbs with varied sizes and colors
    const colors = ['#F97316', '#F59E0B', '#D97706', '#FDBA74', '#FB923C'];
    const sizes = [6, 8, 10, 12, 14, 16, 18];
    
    for (let i = 0; i < 30; i++) {
      const orb = document.createElement('div');
      orb.className = 'absolute rounded-full blur-sm';
      
      // Add gradient to orbs for more sophisticated look
      orb.style.background = `radial-gradient(circle at center, ${colors[Math.floor(Math.random() * colors.length)]}, transparent 70%)`;
      
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      orb.style.width = `${size}px`;
      orb.style.height = orb.style.width;
      orb.style.opacity = '0';
      orbsContainer.appendChild(orb);
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      orb.style.left = `${x}%`;
      orb.style.top = `${y}%`;
      
      // Create individual animation for each orb with more complex path
      anime({
        targets: orb,
        opacity: [0, { value: Math.random() * 0.5 + 0.3, duration: 1500 }],
        translateX: [
          { value: anime.random(-30, 30), duration: anime.random(3000, 5000) },
          { value: anime.random(-30, 30), duration: anime.random(3000, 5000) }
        ],
        translateY: [
          { value: anime.random(-30, 30), duration: anime.random(3000, 5000) },
          { value: anime.random(-30, 30), duration: anime.random(3000, 5000) }
        ],
        scale: [
          { value: anime.random(0.7, 1.3), duration: anime.random(1500, 2500) },
          { value: anime.random(0.7, 1.3), duration: anime.random(1500, 2500) }
        ],
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
        delay: anime.random(0, 1000)
      });
    }
  };
  
  const createGlowingLines = (container: HTMLDivElement) => {
    const linesContainer = document.createElement('div');
    linesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(linesContainer);
    
    // Create SVG for lines with improved design
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.filter = 'drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))';
    linesContainer.appendChild(svg);
    
    // Create network of lines
    const nodePositions = [
      { x: 20, y: 30 }, { x: 30, y: 70 }, { x: 50, y: 20 }, 
      { x: 65, y: 50 }, { x: 80, y: 30 }, { x: 90, y: 80 },
      { x: 40, y: 90 }, { x: 10, y: 60 }, { x: 70, y: 85 },
      { x: 45, y: 40 }, { x: 15, y: 15 }, { x: 85, y: 60 },
    ];
    
    // Create connections between nodes with gradient effect
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', 'lineGradient');
    linearGradient.innerHTML = `
      <stop offset="0%" stop-color="#F97316" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#FB923C" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#FDBA74" stop-opacity="0.3"/>
    `;
    svg.appendChild(linearGradient);
    
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        // Connect nodes based on proximity or randomly with improved algorithm
        const dx = nodePositions[i].x - nodePositions[j].x;
        const dy = nodePositions[i].y - nodePositions[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 30 || Math.random() < 0.2) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', nodePositions[i].x.toString());
          line.setAttribute('y1', nodePositions[i].y.toString());
          line.setAttribute('x2', nodePositions[j].x.toString());
          line.setAttribute('y2', nodePositions[j].y.toString());
          line.setAttribute('stroke', 'url(#lineGradient)');
          line.setAttribute('stroke-width', (0.2 + Math.random() * 0.3).toString());
          line.setAttribute('stroke-opacity', '0.6');
          svg.appendChild(line);
          
          // Add sophisticated animation for lines
          anime({
            targets: line,
            strokeDashoffset: [anime.setDashoffset, 0],
            strokeOpacity: [0, 0.6, 0],
            easing: 'easeInOutSine',
            duration: anime.random(4000, 7000),
            delay: anime.random(0, 2000),
            loop: true,
            direction: 'alternate',
            begin: function(anim) {
              line.setAttribute('stroke-dasharray', anime.setDashoffset(line).toString());
            }
          });
        }
      }
    }
    
    // Create nodes with pulsing effect
    nodePositions.forEach(pos => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x.toString());
      circle.setAttribute('cy', pos.y.toString());
      circle.setAttribute('r', '0.8');
      circle.setAttribute('fill', '#F97316');
      circle.setAttribute('fill-opacity', '0.7');
      svg.appendChild(circle);
      
      // Add a glow effect
      const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      glow.setAttribute('cx', pos.x.toString());
      glow.setAttribute('cy', pos.y.toString());
      glow.setAttribute('r', '1.2');
      glow.setAttribute('fill', '#F97316');
      glow.setAttribute('fill-opacity', '0.3');
      glow.setAttribute('filter', 'blur(1px)');
      svg.insertBefore(glow, circle);
      
      // Animate nodes with more sophisticated pulsing
      anime({
        targets: circle,
        r: [0.6, 1.2, 0.6],
        fillOpacity: [0.4, 0.8, 0.4],
        easing: 'easeInOutSine',
        duration: anime.random(2500, 4500),
        loop: true,
        delay: anime.random(0, 1000)
      });
      
      // Animate glow
      anime({
        targets: glow,
        r: [1, 2.5, 1],
        fillOpacity: [0.1, 0.4, 0.1],
        easing: 'easeInOutSine',
        duration: anime.random(2000, 4000),
        loop: true,
        delay: anime.random(0, 1000)
      });
    });
  };
  
  const createParticlesEffect = (container: HTMLDivElement) => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(particlesContainer);
    
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute';
      
      // Create different particle types for variety
      const particleType = Math.floor(Math.random() * 4);
      
      if (particleType === 0) {
        // Small dot
        particle.className += ' rounded-full';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = '#FED7AA';
      } else if (particleType === 1) {
        // Tiny line
        particle.style.width = '3px';
        particle.style.height = '1px';
        particle.style.backgroundColor = '#FDBA74';
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      } else if (particleType === 2) {
        // Star shape (using Lucide icon)
        const star = document.createElement('div');
        star.innerHTML = '<svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#FB923C" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
        particle.appendChild(star);
      } else {
        // Square
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = '#F59E0B';
      }
      
      particle.style.opacity = '0';
      particlesContainer.appendChild(particle);
      
      // Position randomly
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Animate particles with sophisticated movement
      anime({
        targets: particle,
        opacity: [0, { value: Math.random() * 0.7 + 0.3, duration: 800 }],
        translateX: () => {
          const distance = anime.random(20, 40);
          return [
            anime.random(-distance/2, distance/2),
            anime.random(-distance, distance)
          ]
        },
        translateY: () => {
          const distance = anime.random(20, 40);
          return [
            anime.random(-distance/2, distance/2),
            anime.random(-distance, distance)
          ]
        },
        scale: [
          { value: () => anime.random(0.2, 1), duration: () => anime.random(1000, 3000) },
          { value: () => anime.random(0.2, 1), duration: () => anime.random(1000, 3000) }
        ],
        rotate: () => [0, anime.random(-180, 180)],
        easing: 'easeInOutQuad',
        duration: () => anime.random(3000, 7000),
        delay: anime.random(0, 2000),
        loop: true,
        direction: 'alternate'
      });
    }
  };
  
  const createStarsEffect = (container: HTMLDivElement) => {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(starsContainer);
    
    // Create twinkling stars effect
    for (let i = 0; i < 25; i++) {
      const star = document.createElement('div');
      star.className = 'absolute';
      
      // Use different star sizes
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Create star shape with CSS
      star.style.backgroundColor = '#F97316';
      star.style.borderRadius = '50%';
      star.style.boxShadow = '0 0 3px 1px rgba(249, 115, 22, 0.5)';
      starsContainer.appendChild(star);
      
      // Position randomly but more toward top of screen for a sky effect
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 60}%`;
      
      // Create twinkling animation
      anime({
        targets: star,
        opacity: [
          { value: 0.2, duration: 500, easing: 'linear' },
          { value: 0.9, duration: 500, easing: 'linear' },
          { value: 0.2, duration: 500, easing: 'linear' }
        ],
        scale: [
          { value: 0.8, duration: 700, easing: 'easeInOutSine' },
          { value: 1.2, duration: 700, easing: 'easeInOutSine' },
          { value: 0.8, duration: 700, easing: 'easeInOutSine' }
        ],
        delay: anime.random(0, 3000),
        loop: true
      });
    }
  };
  
  // Add a central orbital system as a focal point
  const createCentralElement = (container: HTMLDivElement) => {
    const centralElement = document.createElement('div');
    centralElement.className = 'absolute pointer-events-none';
    centralElement.style.width = '150px';
    centralElement.style.height = '150px';
    centralElement.style.left = '50%';
    centralElement.style.top = '40%';
    centralElement.style.transform = 'translate(-50%, -50%)';
    centralElement.style.opacity = '0';
    container.appendChild(centralElement);
    
    // Create central orb
    const centralOrb = document.createElement('div');
    centralOrb.className = 'absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
    centralOrb.style.width = '30px';
    centralOrb.style.height = '30px';
    centralOrb.style.background = 'radial-gradient(circle at 30% 30%, #FDBA74, #F97316)';
    centralOrb.style.boxShadow = '0 0 15px 5px rgba(249, 115, 22, 0.4)';
    centralElement.appendChild(centralOrb);
    
    // Create orbital rings
    for (let i = 0; i < 3; i++) {
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      ring.setAttribute('width', '100%');
      ring.setAttribute('height', '100%');
      ring.style.position = 'absolute';
      ring.style.left = '0';
      ring.style.top = '0';
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '75');
      circle.setAttribute('cy', '75');
      circle.setAttribute('r', (40 + i * 15).toString());
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', '#F97316');
      circle.setAttribute('stroke-width', '1');
      circle.setAttribute('stroke-opacity', (0.6 - i * 0.15).toString());
      circle.setAttribute('stroke-dasharray', '5,3');
      ring.appendChild(circle);
      
      centralElement.appendChild(ring);
      
      // Animate ring rotation
      anime({
        targets: ring,
        rotate: i % 2 === 0 ? 360 : -360,
        duration: 15000 + i * 5000,
        easing: 'linear',
        loop: true
      });
      
      // Create orbital satellites
      for (let j = 0; j < 3 + i; j++) {
        const satellite = document.createElement('div');
        satellite.className = 'absolute rounded-full';
        satellite.style.width = '6px';
        satellite.style.height = '6px';
        satellite.style.backgroundColor = j % 2 === 0 ? '#FB923C' : '#F59E0B';
        satellite.style.boxShadow = '0 0 5px 2px rgba(249, 115, 22, 0.3)';
        centralElement.appendChild(satellite);
        
        // Calculate initial position on the orbit
        const angle = (j / (3 + i)) * Math.PI * 2;
        const radius = 40 + i * 15;
        const x = Math.cos(angle) * radius + 75 - 3;
        const y = Math.sin(angle) * radius + 75 - 3;
        
        satellite.style.left = `${x}px`;
        satellite.style.top = `${y}px`;
        
        // Animate satellites along orbit
        anime({
          targets: satellite,
          keyframes: [
            { 
              translateX: { value: -3 + Math.cos(angle + Math.PI/2) * radius - x },
              translateY: { value: -3 + Math.sin(angle + Math.PI/2) * radius - y }
            },
            { 
              translateX: { value: -3 + Math.cos(angle + Math.PI) * radius - x },
              translateY: { value: -3 + Math.sin(angle + Math.PI) * radius - y }
            },
            { 
              translateX: { value: -3 + Math.cos(angle + 3*Math.PI/2) * radius - x },
              translateY: { value: -3 + Math.sin(angle + 3*Math.PI/2) * radius - y }
            },
            { 
              translateX: { value: -3 + Math.cos(angle + 2*Math.PI) * radius - x },
              translateY: { value: -3 + Math.sin(angle + 2*Math.PI) * radius - y }
            }
          ],
          duration: 10000 + i * 2000 - j * 500,
          easing: 'linear',
          loop: true
        });
        
        // Add pulsing effect to satellites
        anime({
          targets: satellite,
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7],
          duration: 2000 + j * 300,
          easing: 'easeInOutSine',
          loop: true,
          delay: j * 400
        });
      }
    }
    
    // Add sparkles around central orb
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FDBA74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3m0 12v3M3 12h3m12 0h3m-3.6-5.4-2.1 2.1m-7 7-2.1 2.1m0-11.2 2.1 2.1m7 7 2.1 2.1"/></svg>';
      sparkle.style.position = 'absolute';
      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      sparkle.style.transform = 'translate(-50%, -50%)';
      sparkle.style.opacity = '0';
      centralElement.appendChild(sparkle);
      
      // Animate sparkles
      anime({
        targets: sparkle,
        translateX: () => anime.random(-40, 40),
        translateY: () => anime.random(-40, 40),
        scale: [0, 1.5, 0],
        opacity: [0, 0.8, 0],
        easing: 'easeOutExpo',
        duration: 3000,
        delay: anime.random(0, 2000),
        loop: true
      });
    }
    
    // Fade in central element
    anime({
      targets: centralElement,
      opacity: [0, 0.8],
      scale: [0.8, 1],
      duration: 1500,
      easing: 'easeOutExpo',
      delay: 300
    });
    
    // Add central pulsing effect
    anime({
      targets: centralOrb,
      scale: [1, 1.2, 1],
      boxShadow: [
        '0 0 15px 5px rgba(249, 115, 22, 0.4)',
        '0 0 25px 10px rgba(249, 115, 22, 0.6)',
        '0 0 15px 5px rgba(249, 115, 22, 0.4)'
      ],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true
    });
  };

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden"></div>;
};

export default HeroAnimationBackground;
