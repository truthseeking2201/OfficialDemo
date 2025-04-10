
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 backdrop-blur-md bg-black/30 py-10 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <h1 className="text-xl font-bold text-gradient">NODO AI</h1>
            </Link>
            <p className="text-sm text-white/60 pr-4">
              Modular AI-driven decentralized financial platform built on the Sui blockchain.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/vaults" className="text-sm text-white/60 hover:text-white transition-colors">Vaults</Link></li>
              <li><Link to="/analytics" className="text-sm text-white/60 hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/activity" className="text-sm text-white/60 hover:text-white transition-colors">Activity</Link></li>
              <li><Link to="/docs" className="text-sm text-white/60 hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">Security</h3>
            <ul className="space-y-2">
              <li><Link to="/audits" className="text-sm text-white/60 hover:text-white transition-colors">Audit Reports</Link></li>
              <li><Link to="/security" className="text-sm text-white/60 hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/compliance" className="text-sm text-white/60 hover:text-white transition-colors">Compliance</Link></li>
              <li><Link to="/bug-bounty" className="text-sm text-white/60 hover:text-white transition-colors">Bug Bounty</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">Community</h3>
            <ul className="space-y-2">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Discord</a></li>
              <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Telegram</a></li>
              <li><a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} NODO AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-xs text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-xs text-white/50 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
