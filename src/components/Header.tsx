import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://github.com', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:contact@example.com', icon: Mail, label: 'Email' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm shadow-md' : ''
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
            <img className='w-12 h-12'  src="../logo.png" alt="logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle, Social Links & CV Download - Desktop */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 xl:w-11 xl:h-11 rounded-lg bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all duration-300 flex items-center justify-center group overflow-hidden"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <div className="relative w-5 h-5 xl:w-6 xl:h-6">
                <Sun 
                  className={`absolute inset-0 text-amber-500 transition-all duration-500 transform ${
                    theme === 'light' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : 'rotate-90 scale-0 opacity-0'
                  }`}
                  size={20}
                />
                <Moon 
                  className={`absolute inset-0 text-blue-400 transition-all duration-500 transform ${
                    theme === 'dark' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                  size={20}
                />
              </div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-lg bg-primary-600/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>

            {/* Social Links */}
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                aria-label={link.label}
              >
                <link.icon size={18} className="xl:w-5 xl:h-5" />
              </a>
            ))}

            {/* CV Download Button */}
            <a
              href="/Amouzoun-Mohammed-CV.pdf"
              download
              className="bg-primary-600 hover:bg-primary-700 text-white px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm xl:text-base shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Download size={14} className="xl:w-4 xl:h-4" />
              <span className='font-sm rounded-xl'>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-9 h-9 rounded-lg bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all duration-300 flex items-center justify-center group overflow-hidden"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <div className="relative w-4 h-4">
                <Sun 
                  className={`absolute inset-0 text-amber-500 transition-all duration-500 transform ${
                    theme === 'light' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : 'rotate-90 scale-0 opacity-0'
                  }`}
                  size={16}
                />
                <Moon 
                  className={`absolute inset-0 text-blue-400 transition-all duration-500 transform ${
                    theme === 'dark' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                  size={16}
                />
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="text-dark-700 dark:text-dark-300 p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 bg-white dark:bg-dark-900 rounded-lg shadow-lg border border-dark-200 dark:border-dark-700">
            <div className="px-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-800 transition-colors duration-200 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Mobile Social Links */}
            <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-dark-200 dark:border-dark-700 mx-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 p-2"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
              <a
                href="/Amouzoun-Mohammed-CV.pdf"
                download
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm shadow-md hover:shadow-lg"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;