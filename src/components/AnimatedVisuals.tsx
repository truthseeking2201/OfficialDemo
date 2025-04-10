
import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

type AnimatedVisualsProps = {
  type: 'particles' | 'wave' | 'hexagons' | 'circles' | 'lines';
  color?: string;
  count?: number;
  className?: string;
};

const AnimatedVisuals: React.FC<AnimatedVisualsProps> = ({
  type,
  color = '#F97316',
  count = 30,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';
    
    switch (type) {
      case 'particles':
        createParticles(container, color, count);
        break;
      case 'wave':
        createWave(container, color);
        break;
      case 'hexagons':
        createHexagons(container, color, count);
        break;
      case 'circles':
        createCircles(container, color, count);
        break;
      case 'lines':
        createLines(container, color, count);
        break;
      default:
        break;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, [type, color, count]);

  const createParticles = (container: HTMLDivElement, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      particle.style.backgroundColor = color;
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.opacity = '0';
      container.appendChild(particle);
    }

    animationRef.current = anime({
      targets: container.children,
      translateX: () => anime.random(-50, 50) + 'vw',
      translateY: () => anime.random(-20, 20) + 'vh',
      scale: () => anime.random(0.2, 1.5),
      opacity: [0, () => anime.random(0.3, 0.6)],
      duration: () => anime.random(1000, 3000),
      delay: anime.stagger(100),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    });
  };

  const createWave = (container: HTMLDivElement, color: string) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1000 300');
    svg.setAttribute('preserveAspectRatio', 'none');
    container.appendChild(svg);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M0,150 C175,50 325,250 500,150 C675,50 825,250 1000,150');
    svg.appendChild(path);

    animationRef.current = anime({
      targets: path,
      d: [
        { value: 'M0,150 C175,250 325,50 500,150 C675,250 825,50 1000,150' },
        { value: 'M0,150 C175,50 325,250 500,150 C675,50 825,250 1000,150' }
      ],
      easing: 'easeInOutSine',
      duration: 5000,
      loop: true
    });
  };

  const createHexagons = (container: HTMLDivElement, color: string, count: number) => {
    const hexSize = 24;  // Size of hexagon
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    for (let i = 0; i < count; i++) {
      const hexagon = document.createElement('div');
      hexagon.className = 'absolute';
      hexagon.style.width = `${hexSize}px`;
      hexagon.style.height = `${hexSize}px`;
      hexagon.style.opacity = '0';
      container.appendChild(hexagon);
      
      // Create SVG hexagon
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', '0 0 100 100');
      
      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', '50,3 91,28 91,72 50,97 9,72 9,28');
      polygon.setAttribute('fill', 'none');
      polygon.setAttribute('stroke', color);
      polygon.setAttribute('stroke-width', '2');
      
      svg.appendChild(polygon);
      hexagon.appendChild(svg);
      
      // Position randomly
      hexagon.style.left = `${anime.random(0, containerWidth - hexSize)}px`;
      hexagon.style.top = `${anime.random(0, containerHeight - hexSize)}px`;
    }
    
    animationRef.current = anime({
      targets: container.children,
      opacity: [0, () => anime.random(0.3, 0.7)],
      scale: [0.5, 1],
      rotate: () => anime.random(-15, 15),
      translateX: () => anime.random(-20, 20),
      translateY: () => anime.random(-20, 20),
      delay: anime.stagger(150),
      duration: 3000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    });
  };

  const createCircles = (container: HTMLDivElement, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const circle = document.createElement('div');
      circle.className = 'absolute rounded-full';
      circle.style.border = `2px solid ${color}`;
      circle.style.width = `${anime.random(20, 60)}px`;
      circle.style.height = `${anime.random(20, 60)}px`;
      circle.style.opacity = '0';
      container.appendChild(circle);
      
      // Position randomly
      circle.style.left = `${anime.random(10, 90)}%`;
      circle.style.top = `${anime.random(10, 90)}%`;
    }
    
    animationRef.current = anime({
      targets: container.children,
      opacity: [0, () => anime.random(0.2, 0.6)],
      scale: [0, 1],
      delay: anime.stagger(100),
      duration: () => anime.random(1000, 3000),
      loop: true,
      direction: 'alternate',
      easing: 'easeOutElastic(1, .6)',
    });
  };

  const createLines = (container: HTMLDivElement, color: string, count: number) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    container.appendChild(svg);
    
    for (let i = 0; i < count; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${anime.random(0, 100)}`);
      line.setAttribute('y1', `${anime.random(0, 100)}`);
      line.setAttribute('x2', `${anime.random(0, 100)}`);
      line.setAttribute('y2', `${anime.random(0, 100)}`);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', '0.5');
      line.setAttribute('stroke-dasharray', '100');
      line.setAttribute('stroke-dashoffset', '100');
      svg.appendChild(line);
    }
    
    animationRef.current = anime({
      targets: svg.querySelectorAll('line'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      delay: anime.stagger(100),
      loop: true,
      direction: 'alternate'
    });
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    ></div>
  );
};

export default AnimatedVisuals;
