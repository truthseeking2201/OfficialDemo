import anime from 'animejs';

// Updated type definition to include NodeListOf<Element>
type AnimationTarget = string | Element | NodeListOf<Element>;

// Basic animations
export const fadeIn = (target: AnimationTarget, duration: number = 800, delay: number = 0) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'easeOutExpo',
    duration,
    delay
  });
};

export const fadeOut = (target: AnimationTarget, duration: number = 800, delay: number = 0) => {
  return anime({
    targets: target,
    opacity: [1, 0],
    translateY: [0, 10],
    easing: 'easeOutExpo',
    duration,
    delay
  });
};

// Staggered animations for lists or grid items
export const staggerFadeIn = (target: AnimationTarget, staggerDelay: number = 50, duration: number = 800) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'easeOutExpo',
    duration,
    delay: anime.stagger(staggerDelay)
  });
};

// Value counter animation
export const countUp = (target: AnimationTarget, endValue: number, duration: number = 2000) => {
  return anime({
    targets: target,
    textContent: [0, endValue],
    round: 1,
    easing: 'easeInOutExpo',
    duration,
    update: function(anim) {
      const element = document.querySelector(target as string);
      if (element && element.hasAttribute('data-format')) {
        const format = element.getAttribute('data-format');
        if (format === 'currency') {
          element.textContent = '$' + element.textContent?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    }
  });
};

// Visual effects
export const pulseGlow = (target: AnimationTarget, color: string = 'rgba(249, 115, 22, 0.6)', duration: number = 1500) => {
  return anime({
    targets: target,
    boxShadow: [
      '0 0 0px rgba(249, 115, 22, 0)',
      `0 0 15px ${color}`,
      '0 0 0px rgba(249, 115, 22, 0)'
    ],
    easing: 'easeInOutSine',
    duration,
    loop: true
  });
};

// Interactive hovering elements
export const floatingElement = (target: AnimationTarget, distance: number = 15) => {
  return anime({
    targets: target,
    translateY: [0, -distance, 0],
    easing: 'easeInOutSine',
    duration: 3000,
    loop: true
  });
};

// Path drawing animation for SVGs
export const drawSVGPath = (target: AnimationTarget, duration: number = 1500, delay: number = 0) => {
  return anime({
    targets: target,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration,
    delay,
    direction: 'normal',
  });
};

// Background gradient animation
export const animateGradient = (target: AnimationTarget, colors: string[], duration: number = 3000) => {
  const keyframes = [];
  for (let i = 0; i < colors.length; i++) {
    keyframes.push({ backgroundPosition: `${i * 100}% 0%` });
  }
  keyframes.push({ backgroundPosition: '100% 0%' });
  
  return anime({
    targets: target,
    keyframes,
    easing: 'easeInOutSine',
    duration,
    loop: true,
    direction: 'alternate'
  });
};

// Text scramble effect - Fixed to handle both string selectors and direct DOM element references
export const textScramble = (target: AnimationTarget, finalText: string, duration: number = 2000) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  
  let element: Element | null = null;
  
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else if (target instanceof Element) {
    element = target;
  } else if (target instanceof NodeList && target.length > 0) {
    element = target[0] as Element;
  }
  
  if (!element) {
    console.error('Text scramble could not find target element');
    return { reset: () => {} };
  }
  
  const originalText = element.textContent || '';
  let output = '';
  let frameRate = 30;
  let frame = 0;
  
  const randomChar = () => characters.charAt(Math.floor(Math.random() * characters.length));
  
  const update = () => {
    const progress = anime.min(1, frame / frameRate);
    const textLength = Math.floor(finalText.length * progress);
    
    output = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < textLength) {
        output += finalText[i];
      } else {
        output += randomChar();
      }
    }
    
    element!.textContent = output;
    
    if (frame < frameRate) {
      frame++;
      requestAnimationFrame(update);
    }
  };
  
  update();
  
  return {
    reset: () => {
      if (element) element.textContent = originalText;
    }
  };
};

// Added: Digital number counter with flipping effect
export const digitalCounter = (target: AnimationTarget, endValue: number, duration: number = 2000) => {
  return anime({
    targets: target,
    innerHTML: [0, endValue],
    round: 1,
    easing: 'easeInOutExpo',
    duration,
    update: function(anim) {
      const targets = anim.animatables;
      targets.forEach(animatable => {
        const target = animatable.target;
        const value = Math.floor(target.innerHTML);
        const formattedValue = value.toString().padStart(2, '0');
        target.innerHTML = formattedValue;
      });
    }
  });
};

// Added: Particle system animation
export const createParticleSystem = (container: HTMLElement, count: number = 30, color: string = '#F97316') => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full';
    particle.style.backgroundColor = color;
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.opacity = '0';
    container.appendChild(particle);
  }

  return anime({
    targets: container.children,
    translateX: () => anime.random(-100, 100) + '%',
    translateY: () => anime.random(-100, 100) + '%',
    scale: () => anime.random(0.2, 1),
    opacity: [0, () => anime.random(0.3, 0.7)],
    duration: () => anime.random(1000, 3000),
    delay: anime.stagger(100, {from: 'center'}),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad',
  });
};

// Added: Advanced glow effect for elements
export const advancedGlow = (target: AnimationTarget, primaryColor: string, secondaryColor: string) => {
  return anime({
    targets: target,
    boxShadow: [
      '0 0 5px ' + primaryColor + '33',
      '0 0 20px ' + primaryColor + '66',
      '0 0 35px ' + secondaryColor + '33',
      '0 0 20px ' + primaryColor + '66',
      '0 0 5px ' + primaryColor + '33'
    ],
    easing: 'easeInOutSine',
    duration: 3000,
    loop: true
  });
};

// Added: Typing animation for text
export const typeText = (target: AnimationTarget, text: string, speed: number = 50) => {
  let element: Element | null = null;
  
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else if (target instanceof Element) {
    element = target;
  } else if (target instanceof NodeList && target.length > 0) {
    element = target[0] as Element;
  }
  
  if (!element) {
    console.error('Type text could not find target element');
    return;
  }
  
  let i = 0;
  element.textContent = '';
  
  const typing = () => {
    if (i < text.length) {
      element!.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  };
  
  typing();
};

// Added: Advanced particle system with custom shapes and behaviors
export const createAdvancedParticleSystem = (
  container: HTMLElement, 
  config: {
    count?: number;
    colors?: string[];
    shapes?: ('circle' | 'square' | 'triangle' | 'star' | 'hexagon')[];
    minSize?: number;
    maxSize?: number;
    minSpeed?: number;
    maxSpeed?: number;
    glowEffect?: boolean;
    interactOnHover?: boolean;
  } = {}
) => {
  const {
    count = 30,
    colors = ['#F97316', '#FB923C', '#FDBA74', '#FED7AA'],
    shapes = ['circle', 'circle', 'circle', 'star', 'hexagon'],
    minSize = 3,
    maxSize = 8,
    minSpeed = 1000,
    maxSpeed = 3000,
    glowEffect = true,
    interactOnHover = false
  } = config;
  
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute';
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * (maxSize - minSize) + minSize;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = '0';
    
    switch (shape) {
      case 'circle':
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        break;
      case 'square':
        particle.style.backgroundColor = color;
        break;
      case 'triangle':
        particle.style.width = '0';
        particle.style.height = '0';
        particle.style.borderLeft = `${size/2}px solid transparent`;
        particle.style.borderRight = `${size/2}px solid transparent`;
        particle.style.borderBottom = `${size}px solid ${color}`;
        break;
      case 'star':
        const svgStar = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgStar.setAttribute('viewBox', '0 0 24 24');
        svgStar.setAttribute('width', `${size * 3}px`);
        svgStar.setAttribute('height', `${size * 3}px`);
        
        const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        starPath.setAttribute('points', '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26');
        starPath.setAttribute('fill', color);
        starPath.setAttribute('stroke', 'none');
        
        svgStar.appendChild(starPath);
        particle.appendChild(svgStar);
        break;
      case 'hexagon':
        const svgHex = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgHex.setAttribute('viewBox', '0 0 24 24');
        svgHex.setAttribute('width', `${size * 3}px`);
        svgHex.setAttribute('height', `${size * 3}px`);
        
        const hexPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        hexPath.setAttribute('points', '12,2 22,7 22,17 12,22 2,17 2,7');
        hexPath.setAttribute('fill', color);
        
        svgHex.appendChild(hexPath);
        particle.appendChild(svgHex);
        break;
    }
    
    if (glowEffect && (shape === 'circle' || shape === 'square')) {
      particle.style.boxShadow = `0 0 ${size/2}px ${color}`;
    }
    
    container.appendChild(particle);
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    const timeline = anime.timeline();
    
    timeline.add({
      targets: particle,
      opacity: [0, Math.random() * 0.5 + 0.3],
      duration: 800,
      easing: 'easeInOutQuad'
    });
    
    timeline.add({
      targets: particle,
      translateX: () => anime.random(-50, 50) + 'px',
      translateY: () => anime.random(-50, 50) + 'px',
      rotate: () => anime.random(-360, 360),
      scale: () => [anime.random(0.8, 1.2), anime.random(0.8, 1.2)],
      opacity: () => [anime.random(0.3, 0.8), anime.random(0.3, 0.8)],
      easing: 'easeInOutSine',
      duration: () => anime.random(minSpeed, maxSpeed),
      complete: (anim) => {
        const particle = anim.animatables[0].target;
        
        anime({
          targets: particle,
          translateX: () => anime.random(-50, 50) + 'px',
          translateY: () => anime.random(-50, 50) + 'px',
          rotate: () => anime.random(-360, 360),
          scale: () => anime.random(0.8, 1.2),
          opacity: () => anime.random(0.3, 0.8),
          easing: 'easeInOutSine',
          duration: () => anime.random(minSpeed, maxSpeed),
          complete: function(anim) {
            anim.complete = () => {
              this.complete(anim);
            };
            anim.restart();
          }
        });
      }
    });
    
    if (interactOnHover) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const particles = container.children;
        Array.from(particles).forEach((p: Element) => {
          const particleElement = p as HTMLElement;
          const particleRect = particleElement.getBoundingClientRect();
          const particleCenterX = (particleRect.left + particleRect.right) / 2 - rect.left;
          const particleCenterY = (particleRect.top + particleRect.bottom) / 2 - rect.top;
          
          const dx = mouseX - particleCenterX;
          const dy = mouseY - particleCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * (100 - distance) * 0.2;
            const pushY = Math.sin(angle) * (100 - distance) * 0.2;
            
            anime({
              targets: particleElement,
              translateX: `+=${-pushX}`,
              translateY: `+=${-pushY}`,
              easing: 'easeOutElastic(1, .6)',
              duration: 800
            });
          }
        });
      });
    }
  }
  
  return {
    particles: container.children,
    container
  };
};

// Added: 3D perspective effect for elements
export const apply3DEffect = (target: AnimationTarget, intensity: number = 10) => {
  let element: Element | null = null;
  
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else if (target instanceof Element) {
    element = target;
  } else if (target instanceof NodeList && target.length > 0) {
    element = target[0] as Element;
  }
  
  if (!element) {
    console.error('3D effect could not find target element');
    return;
  }
  
  if (element.parentElement) {
    element.parentElement.style.perspective = '1000px';
  }
  
  (element as HTMLElement).style.transition = 'transform 0.3s ease';
  
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element!.getBoundingClientRect();
    const centerX = (rect.left + rect.right) / 2;
    const centerY = (rect.top + rect.bottom) / 2;
    
    const rotateY = ((e.clientX - centerX) / rect.width) * intensity;
    const rotateX = -((e.clientY - centerY) / rect.height) * intensity;
    
    (element as HTMLElement).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    (element as HTMLElement).style.transform = 'rotateX(0deg) rotateY(0deg)';
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element!.removeEventListener('mousemove', handleMouseMove);
    element!.removeEventListener('mouseleave', handleMouseLeave);
  };
};
