import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const skills = skillsRef.current;

    if (!section || !skills) return;

    gsap.fromTo(
      skills.children,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    // Animate individual skill items
    const skillItems = section.querySelectorAll('.skill-item');
    gsap.fromTo(
      skillItems,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );
  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      img : '/pr.png',
      skills: [
        { name: 'JavaScript', icon: '/js.webp' },
        { name: 'TypeScript', icon: '/ts.png' },
        { name: 'Python', icon: '/py.webp' },
        { name: 'SQL', icon: '/sql.png' },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      img : '/fr.png',
      skills: [
        { name: 'React.js', icon:'/react.png' },
        { name: 'Node.js', icon: '/node-js.png' },
        { name: 'Express', icon: '/express-js.png' },
        { name: 'Tailwind CSS', icon: '/Tailwind_CSS_Logo.svg.png' },
      ],
    },
    {
      title: 'Tools & Technologies',
      img : '/tools.png',
      skills: [
        { name: 'Git & GitHub', icon: '/git.png' },
        { name: 'PostgreSQL', icon: '/Postgresql.png' },
        { name: 'MongoDB', icon: '/mongodb.svg' },
        { name: 'Figma', icon: '/figma.png' },
      ],
  },
  {
      title: 'Web Development Concepts',
      img : '/web.png',
      skills: [
        { name: 'Responsive Design', icon: '/rsd.webp' },
        { name: 'Progressive Web Apps', icon: '/pwa.png' },
        { name: 'REST APIs', icon: '/rest.png' },
        { name: 'Performance Optimization', icon: '/speed.png' },
      ],
  },
    
   
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-dark-50 dark:bg-dark-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
            Skills & Expertise
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6 sm:mb-8 transition-colors duration-300"></div>
          <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto transition-colors duration-300">
            A comprehensive toolkit of modern technologies and professional skills
          </p>
        </div>

        <div ref={skillsRef} className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white dark:bg-dark-900 rounded-xl p-6 sm:p-8 shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-colors duration-300">
                   <img src={category.img} alt="" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white text-center transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-item flex items-center p-3 sm:p-4 bg-dark-50 dark:bg-dark-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-dark-700 rounded-lg flex items-center justify-center mr-3 sm:mr-4 shadow-sm group-hover:bg-primary-600 dark:group-hover:bg-primary-500 group-hover:shadow-md transition-all duration-200">
                       <img src={skill.icon} alt="" />
                    </div>
                    <span className="text-dark-700 dark:text-dark-300 font-medium text-sm sm:text-base group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Technologies */}
        <div className="mt-12 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-6 sm:mb-8 transition-colors duration-300">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { name: 'Redux', icon: '' },
              { name: 'Sass/SCSS', icon: '' },
              { name: 'Firebase', icon: '' },
              { name: 'Vercel', icon: '' },
            ].map((tech, index) => (
              <div
                key={index}
                className="flex items-center bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 sm:px-4 py-2 sm:py-3 rounded-full font-medium hover:bg-primary-200 dark:hover:bg-primary-800 transition-all duration-200 cursor-default group"
              >
               
                <span className="text-sm sm:text-base">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-12 sm:mt-16  text-white text-center transition-colors duration-300">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Passionate About Continuous Learning
            </h3>
            <p className="text-primary-100 dark:text-primary-200 leading-relaxed text-sm sm:text-base transition-colors duration-300">
                I’m always exploring emerging technologies and modern methodologies to stay at the forefront of web development. Currently focused on mastering <strong>AI agents</strong>, <strong>Three.js</strong> , and <strong>GSAP</strong>  to build more engaging, creative, and user-focused interfaces. My diverse skill set enables me to solve complex problems and deliver innovative, impactful solutions that enhance both user experience and business outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;