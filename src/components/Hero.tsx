import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Download, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Main content animation
    tl.from(titleRef.current, {
      y: 60,
      duration: 1.2,
      ease: 'power3.out',
    })
      .from(
        subtitleRef.current,
        {
          y: 40,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .from(
        ctaRef.current,
        {
          y: 40,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .from(
        scrollIndicatorRef.current,
        {
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.2'
      );

    // Continuous scroll indicator animation
    const scrollArrow = scrollIndicatorRef.current?.querySelector('.scroll-arrow');
    if (scrollArrow) {
      gsap.to(scrollArrow, {
        y: 8,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Amouzoun-Mohammed-CV.pdf';
    link.download = 'Mohammed-Amouzoun-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactMe = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden transition-colors duration-300  font-sans"
    >
      {/* Ambient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 transition-colors duration-300" />
      <img src="/assets/image.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />

      {/* Content Container - All shadows removed */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="max-w-5xl mx-auto text-center flex flex-col">
          {/* Main Heading - Text shadows removed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left flex flex-col items-start">
              <h1
                ref={titleRef}
                className="font-semibold text-white uppercase text-5xl sm:text-6xl md:text-7xl"
              >
                HI, My Name is
                <span className=" text-primary-400 min-w-lg ">
                  {' '}Mohammed 
                </span>
              </h1>
            </div>
            <div className="text-right mt-8 md:mt-28">
              <p
                ref={subtitleRef}
                className="mb-10 sm:mb-12 leading-relaxed max-w-4xl mx-auto text-white "
                style={{ 
                  fontSize: 'clamp(1.125rem, 3vw, 1.875rem)'
                }}
              >
                I'm a <span className="text-[#4ade80] p-1 animate-[moveDown_1s_ease-in-out]">Full Stack Developer </span>passionate about building accessible web apps that users love
              </p>
            </div>
          </div>

          {/* Call-to-Action Buttons - All shadows removed */}
          <div ref={ctaRef} className=" flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-28 mt-18">
            <button 
              onClick={handleDownloadCV}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-white text-black overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Download Mohammed Amouzoun's CV"
            >
              <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                <Download size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Download CV</span>
              </div>
            </button>
            
            <button 
              onClick={handleContactMe}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-white bg-transparent hover:bg-white/10 hover:border-white/50 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Contact Mohammed Amouzoun"
            >
              <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                <Mail size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Contact Me</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Drop shadow removed */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center space-y-2 sm:space-y-3 transition-all duration-300 hover:scale-110 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
          aria-label="Scroll to about section"
        >
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Scroll Down
          </span>
          
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300 flex items-center justify-center">
              <ChevronDown 
                size={20} 
                className="scroll-arrow text-white/80 group-hover:text-white transition-colors duration-300 sm:w-6 sm:h-6" 
              />
            </div>
            <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>
          </div>
          
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </button>
      </div>
    </section>
                     
  );
};

export default Hero;