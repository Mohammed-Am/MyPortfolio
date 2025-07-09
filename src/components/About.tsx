import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    if (!section || !content || !stats) return;

    gsap.fromTo(
      content.children,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      }
    );

    gsap.fromTo(
      stats.children,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: stats,
          start: 'top 90%',
        },
      }
    );
  }, []);

 

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-dark-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
              About Me
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6 sm:mb-8 transition-colors duration-300"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            <div className="order-2 lg:order-1">
              <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
                Passionate Full-Stack Developer
              </h3>
              <p className="text-dark-600 dark:text-dark-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base transition-colors duration-300">
                I'm a dedicated full-stack developer with a passion for creating
                innovative web solutions. With expertise in modern technologies
                like React, Node.js, and cloud platforms, I transform ideas into
                powerful digital experiences.
              </p>
              <p className="text-dark-600 dark:text-dark-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base transition-colors duration-300">
                My journey in web development started with curiosity and has
                evolved into a career focused on building scalable, user-centric
                applications. I believe in writing clean, maintainable code and
                staying updated with the latest industry trends.
              </p>
          
            </div>

            <div className="relative order-1 lg:order-2 ">
              <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-2xl flex items-center justify-center transition-colors duration-300">
                <div className="text-4xl sm:text-5xl lg:text-6xl text-primary-600 dark:text-primary-400 font-bold transition-colors duration-300">
                   <img className='max-w-md h-full' src="/img.png" alt="" />
                </div>
              </div>
            
            </div>
          </div>
         </div>
        </div>
    </section>
  );
};

export default About;