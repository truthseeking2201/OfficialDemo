
import React from 'react';

const PartnersSection = () => {
  return (
    <div className="py-16 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Trusted Partners</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We collaborate with leading protocols, market makers, and security firms to deliver institutional-grade infrastructure.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Partner logos would go here - using placeholders */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-center h-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 w-full h-full flex items-center justify-center">
                <span className="text-white/40 font-semibold">Partner {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold mb-2">Security Audits</h3>
              <p className="text-sm text-white/70">
                Fully audited by leading security firms to ensure the safety of user funds.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold mb-2">Institutional Compliance</h3>
              <p className="text-sm text-white/70">
                Meeting strict regulatory requirements for institutional investors.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold mb-2">AI Technology</h3>
              <p className="text-sm text-white/70">
                Leveraging state-of-the-art AI algorithms from industry-leading partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
