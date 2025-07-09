import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const projects = projectsRef.current;

    if (!section || !projects) return;

    gsap.fromTo(
      projects.children,
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
        },
      }
    );
  }, []);

  const projects = [
    {
      title: 'ChefPrompt AI ',
      description: 'ChefPrompt AI is an innovative web application built with React.js, CSS, and powered by cloud-based AI. This app allows users to seamlessly generate recipes based on their available ingredients.',
      image: './project1.png',
      technologies: ['React', 'cloud-based AI' , 'Tailwind CSS'],
      github: 'https://github.com/Mohammed-Am/ChefPrompt-AI',
      live: 'https://example.com',
      featured: true,
    },
   {
      title: 'AFCON & World Cup Morocco 2025 Organization',
      description: 'A real-time collaborative event and task management platform built for organizing international tournaments like AFCON and the World Cup. Features include team collaboration, live updates, and drag-and-drop task management.',
      image: '/AFACON.png',
      technologies: ['React', 'Node.js', 'Tailwind CSS', 'Express', 'MongoDB'],
      github: 'https://github.com/Mohammed-Am/frontend-afcon-worldcup-morocco2025-organization',
      live: 'https://frontend-afcon-worldcup-morocco2025.vercel.app/',
      featured: true
    },
    {
      title: 'Movietime',
      description: 'provides information about movies, TV shows, actors, directors, and other industry professionals and casual viewers alike. It offers a wide range of information, including plot summaries, cast and crew details, user ratings, reviews, trivia, and more.',
      image: '/movies.jpg',
      technologies: ['HTML', ' CSS', 'Bootstrap',' PHP','MySQL'],
      github: 'https://github.com/Mohammed-Am/Movietime',
      live: '',
      featured: false,
    },
    {
      title: 'PlatformELearning',
      description: 'ELearning platforms offer free access to course materials and resources, allowing you to learn online without the need for pay. You can access the course content directly through their platforms or websites.',
      image: '/ECOURSE.jpg',
      technologies: ['HTML', ' CSS', 'Botstrap',' PHP','MySQL'],
      github: 'https://github.com/Mohammed-Am/PlatformELearning',
      live: '',
      featured: false,
    },
    {
      title: 'TechNews ',
      description: 'TechNews blog covers a wide range of technology news,you can create and update and delete your blog',
      image: '/techblog.jpg',
      technologies: ['MongoDB', 'Express', 'Bootstrap '],
      github: 'https://github.com/Mohammed-Am/BlogTechNews',
      live: '',
      featured: false,
    }

  ];

  return (
    <section id="projects" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-dark-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-12xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
            My Work
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6 sm:mb-8 transition-colors duration-300"></div>
          <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto transition-colors duration-300">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        <div ref={projectsRef} className="space-y-12 sm:space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-xl shadow-lg dark:shadow-2xl group-hover:shadow-2xl dark:group-hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-108 sm:h-100 lg:h-100 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  
                  {/* Project Links Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        className="bg-white dark:bg-dark-800 text-dark-900 dark:text-white p-3 rounded-full hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-colors duration-200"
                        aria-label="View GitHub repository"
                        target="_blank"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.live}
                        className="bg-white dark:bg-dark-800 text-dark-900 dark:text-white p-3 rounded-full hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-colors duration-200"
                        aria-label="View live project"
                        target="_blank"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                
                {project.featured && (
                  <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-primary-600 dark:bg-primary-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <a
                    href={project.github}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium text-sm sm:text-base"
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center justify-center space-x-2 bg-primary-600 dark:bg-primary-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200 font-medium text-sm sm:text-base"
                  >
                    <span>Live Demo</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <div className="text-center mt-12 sm:mt-16">
          <a
            href="https://github.com/Mohammed-Am"
            target='_blank'
            className="inline-flex items-center space-x-2 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base"
          >
            <span>View All Projects</span>
            <Github size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;