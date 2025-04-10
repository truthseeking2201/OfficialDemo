
import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

const AIProtocolAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const ringsContainerRef = useRef<HTMLDivElement>(null);
  const connectionsRef = useRef<HTMLDivElement>(null);

  // Initialize the animation elements
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up function to pause all animations when component unmounts
    const animations: anime.AnimeInstance[] = [];

    // Create background neural grid
    createNeuralGrid();
    
    // Create floating particles
    createDataParticles();
    
    // Create central rings
    createCoreRings();
    
    // Create flickering connections
    createWebConnections();
    
    // Add ambient motion to the entire composition
    createAmbientMotion();

    // Add parallax effect
    initParallaxEffect();

    return () => {
      // Clean up all animations
      animations.forEach(anim => anim.pause());
    };

    // Create neural grid background
    function createNeuralGrid() {
      if (!gridContainerRef.current) return;
      const gridContainer = gridContainerRef.current;
      
      // Create grid lines
      const gridSize = 12;
      const gridSpacing = 100 / gridSize;
      
      // Create horizontal and vertical lines
      for (let i = 1; i < gridSize; i++) {
        // Horizontal lines
        const hLine = document.createElement('div');
        hLine.className = 'absolute h-[0.5px] bg-nova/10 w-full';
        hLine.style.top = `${i * gridSpacing}%`;
        gridContainer.appendChild(hLine);
        
        // Vertical lines
        const vLine = document.createElement('div');
        vLine.className = 'absolute w-[0.5px] bg-nova/10 h-full';
        vLine.style.left = `${i * gridSpacing}%`;
        gridContainer.appendChild(vLine);
      }
      
      // Animate the grid with gentle pulsing
      const gridPulse = anime({
        targets: gridContainer.children,
        opacity: [0.05, 0.2],
        easing: 'easeInOutSine',
        duration: 3000,
        delay: anime.stagger(100, {grid: [gridSize, gridSize], from: 'center'}),
        loop: true,
        direction: 'alternate',
      });
      
      animations.push(gridPulse);
      
      // Create wave-like motion across the grid
      const waveMotion = anime({
        targets: gridContainer.children,
        translateY: (el, i) => anime.random(-5, 5),
        translateX: (el, i) => anime.random(-5, 5),
        easing: 'easeInOutQuad',
        duration: 8000,
        delay: anime.stagger(100, {from: 'center'}),
        loop: true,
        direction: 'alternate',
        complete: function(anim) {
          anim.restart();
        }
      });
      
      animations.push(waveMotion);
    }
    
    // Create floating data particles
    function createDataParticles() {
      if (!particlesContainerRef.current) return;
      const container = particlesContainerRef.current;
      
      const particleCount = 40;
      const colors = ['#F97316', '#D97706', '#FBBF24', '#A3E635'];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = anime.random(3, 8);
        
        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.opacity = '0';
        particle.dataset.index = i.toString();
        
        container.appendChild(particle);
      }
      
      // Animate the particles
      const particleAnimation = anime({
        targets: container.children,
        translateX: () => `${anime.random(-40, 40)}%`,
        translateY: () => `${anime.random(-40, 40)}%`,
        translateZ: () => `${anime.random(-200, 200)}`,
        opacity: [0, () => anime.random(0.3, 0.7)],
        scale: () => anime.random(0.5, 1.5),
        easing: 'easeOutExpo',
        duration: () => anime.random(3000, 5000),
        delay: anime.stagger(100, {grid: [10, 4], from: 'center'}),
        loop: true,
        direction: 'alternate',
      });
      
      animations.push(particleAnimation);
      
      // Create transaction simulations where 2-3 particles move together
      setInterval(() => {
        const transactionSize = anime.random(2, 3);
        const particleIndices = Array.from({length: transactionSize}, () => 
          Math.floor(Math.random() * particleCount));
        
        const transactionParticles = particleIndices.map(index => 
          container.querySelector(`[data-index="${index}"]`));
        
        const destinationX = anime.random(-30, 30);
        const destinationY = anime.random(-30, 30);
        
        const transactionAnimation = anime({
          targets: transactionParticles,
          translateX: destinationX + '%',
          translateY: destinationY + '%',
          scale: 1.5,
          opacity: 0.9,
          easing: 'easeInOutQuad',
          duration: 1500,
          complete: function() {
            anime({
              targets: transactionParticles,
              scale: [1.5, 1],
              opacity: [0.9, 0.5],
              easing: 'easeOutExpo',
              duration: 1000
            });
          }
        });
        
        animations.push(transactionAnimation);
      }, 3000);
    }
    
    // Create core rings
    function createCoreRings() {
      if (!ringsContainerRef.current) return;
      const container = ringsContainerRef.current;
      
      const ringSizes = [80, 120, 160];
      const ringColors = ['rgba(249, 115, 22, 0.7)', 'rgba(217, 119, 6, 0.5)', 'rgba(234, 179, 8, 0.3)'];
      
      ringSizes.forEach((size, i) => {
        const ring = document.createElement('div');
        ring.className = 'absolute rounded-full border';
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.borderColor = ringColors[i];
        ring.style.borderWidth = `${2 - i * 0.5}px`;
        ring.style.left = '50%';
        ring.style.top = '50%';
        ring.style.transform = 'translate(-50%, -50%)';
        ring.style.boxShadow = `0 0 15px ${ringColors[i]}`;
        container.appendChild(ring);
      });
      
      // Animate rings rotation
      const rings = container.children;
      const ringRotation = anime({
        targets: rings,
        rotate: (el, i) => [(i % 2 === 0 ? 0 : 180), (i % 2 === 0 ? 360 : -180)],
        easing: 'linear',
        duration: (el, i) => 12000 + i * 4000,
        loop: true
      });
      
      animations.push(ringRotation);
      
      // Ring pulsation
      const ringPulse = anime({
        targets: rings,
        scale: [1, 1.05],
        opacity: [0.7, 1],
        easing: 'easeInOutSine',
        duration: (el, i) => 2000 + i * 500,
        delay: anime.stagger(300),
        loop: true,
        direction: 'alternate'
      });
      
      animations.push(ringPulse);
    }
    
    // Create flickering web connections
    function createWebConnections() {
      if (!connectionsRef.current || !particlesContainerRef.current) return;
      const container = connectionsRef.current;
      
      // Create SVG for connections
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      container.appendChild(svg);
      
      // Periodically create connections between particles
      setInterval(() => {
        if (!particlesContainerRef.current) return;
        
        // Get random particles
        const particles = particlesContainerRef.current.children;
        if (particles.length < 2) return;
        
        const idx1 = Math.floor(Math.random() * particles.length);
        let idx2;
        do {
          idx2 = Math.floor(Math.random() * particles.length);
        } while (idx2 === idx1);
        
        const particle1 = particles[idx1] as HTMLElement;
        const particle2 = particles[idx2] as HTMLElement;
        
        // Create a connection line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        
        // Get particle positions
        const rect1 = particle1.getBoundingClientRect();
        const rect2 = particle2.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate relative positions
        const x1 = rect1.left - containerRect.left + rect1.width/2;
        const y1 = rect1.top - containerRect.top + rect1.height/2;
        const x2 = rect2.left - containerRect.left + rect2.width/2;
        const y2 = rect2.top - containerRect.top + rect2.height/2;
        
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.6)');
        line.setAttribute('stroke-width', '0.5');
        
        svg.appendChild(line);
        
        // Animate the connection
        const lineAnimation = anime({
          targets: line,
          opacity: [0, 0.7, 0],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1000,
          complete: function() {
            svg.removeChild(line);
          }
        });
        
        animations.push(lineAnimation);
      }, 800);
    }
    
    // Create ambient motion
    function createAmbientMotion() {
      if (!containerRef.current) return;
      
      const ambientMotion = anime({
        targets: containerRef.current,
        translateX: ['-2px', '2px'],
        translateY: ['-2px', '2px'],
        easing: 'easeInOutQuad',
        duration: 8000,
        loop: true,
        direction: 'alternate'
      });
      
      animations.push(ambientMotion);
    }
    
    // Initialize parallax effect
    function initParallaxEffect() {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;
        
        // Calculate normalized mouse position between -1 and 1
        const normalizedX = (mouseX / containerRect.width - 0.5) * 2;
        const normalizedY = (mouseY / containerRect.height - 0.5) * 2;
        
        // Apply parallax to different layers with different intensities
        if (gridContainerRef.current) {
          anime({
            targets: gridContainerRef.current,
            translateX: normalizedX * 5,
            translateY: normalizedY * 5,
            easing: 'easeOutQuad',
            duration: 1000
          });
        }
        
        if (particlesContainerRef.current) {
          anime({
            targets: particlesContainerRef.current,
            translateX: normalizedX * 15,
            translateY: normalizedY * 15,
            easing: 'easeOutQuad',
            duration: 800
          });
        }
        
        if (ringsContainerRef.current) {
          anime({
            targets: ringsContainerRef.current,
            translateX: normalizedX * 8,
            translateY: normalizedY * 8,
            easing: 'easeOutQuad',
            duration: 1200
          });
        }
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      
      // Clean up event listener
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-0 bg-gradient-to-br from-black via-[#120b17] to-[#1a1626]"
    >
      {/* Neural Grid Matrix */}
      <div ref={gridContainerRef} className="absolute inset-0"></div>
      
      {/* Energy Particles / Data Nodes */}
      <div ref={particlesContainerRef} className="absolute inset-0"></div>
      
      {/* Genesis Rings / AI Core */}
      <div ref={ringsContainerRef} className="absolute inset-0"></div>
      
      {/* Flickering Links / Web3 Mesh */}
      <div ref={connectionsRef} className="absolute inset-0"></div>
    </div>
  );
};

export default AIProtocolAnimation;
