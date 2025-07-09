import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-900 dark:bg-black text-white py-8 sm:py-12 relative transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-primary-400 dark:text-primary-300 mb-3 sm:mb-4 transition-colors duration-300">MA</div>
          <p className="text-dark-300 dark:text-dark-400 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base transition-colors duration-300">
            Full-Stack Developer passionate about creating exceptional digital experiences
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-dark-400 dark:text-dark-500 mb-6 sm:mb-8 text-sm sm:text-base transition-colors duration-300">
            <span>Made with</span>
            <Heart className="text-red-500 fill-current" size={14} />
            <span>by Mohammed Amouzoun</span>
          </div>

          <div className="border-t border-dark-700 dark:border-dark-800 pt-6 sm:pt-8 transition-colors duration-300">
            <p className="text-dark-400 dark:text-dark-500 text-xs sm:text-sm transition-colors duration-300">
              © {new Date().getFullYear()} Mohammed Amouzoun. All rights reserved.
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} className="sm:w-5 sm:h-5 text-white" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;