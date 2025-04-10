
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VaultsSection from '@/components/VaultsSection';
import CtaSection from '@/components/CtaSection';
import FeaturesSection from '@/components/FeaturesSection';
import { fadeIn } from '@/lib/animations';

const Index = () => {
  useEffect(() => {
    // Apply sequential fade-in animations to the main sections
    // Delay each section to create a nice scrolling effect
    fadeIn('#vaults-section', 800, 300);
    
    // Create scroll animation revealing effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Get all sections we want to animate on scroll
      const sections = document.querySelectorAll('.scroll-animate-section');
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        // Check if section is coming into view
        if (scrollY > sectionTop - viewportHeight + 100) {
          section.classList.add('animate-fade-in');
          section.classList.remove('opacity-0');
        }
      });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on load
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="scroll-animate-section opacity-0">
          <FeaturesSection />
        </div>
        <div id="vaults-section" className="scroll-animate-section opacity-0">
          <VaultsSection />
        </div>
        <div className="scroll-animate-section opacity-0">
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
