import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Send, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    if (!section || !form || !contactInfo) return;

    gsap.fromTo(
      [form, contactInfo],
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    try {
      await emailjs.send(
        'service_3jrhs9n', 
        'template_7obsn4s', 
        formData, 
        'UyfXHNf05oiiYP14t'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.log(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'mh.amouzoun@gmail.com',
      href: 'mailto:mohammed.amouzoun@example.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+212 676426450',
    },
   
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Mohammed-Am', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammed-amouzoun/', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-dark-50 dark:bg-dark-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
            Get In Touch
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6 sm:mb-8 transition-colors duration-300"></div>
          <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto transition-colors duration-300">
            Ready to start your next project? Let's discuss how we can work together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-dark-900 rounded-xl p-6 sm:p-8 shadow-lg dark:shadow-2xl transition-colors duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">Send Message</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div>
                <label htmlFor="name" className="block text-dark-700 dark:text-dark-300 font-medium mb-2 text-sm sm:text-base transition-colors duration-300">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-dark-700 dark:text-dark-300 font-medium mb-2 text-sm sm:text-base transition-colors duration-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label htmlFor="subject" className="block text-dark-700 dark:text-dark-300 font-medium mb-2 text-sm sm:text-base transition-colors duration-300">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                placeholder="Project Discussion"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label htmlFor="message" className="block text-dark-700 dark:text-dark-300 font-medium mb-2 text-sm sm:text-base transition-colors duration-300">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 dark:bg-primary-500 text-white py-3 sm:py-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="mt-4 p-3 sm:p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm sm:text-base transition-colors duration-300">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-3 sm:p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm sm:text-base transition-colors duration-300">
                Failed to send message. Please try again or contact me directly.
              </div>
            )}
          </form>

          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">Contact Information</h3>
              <p className="text-dark-600 dark:text-dark-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base transition-colors duration-300">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-dark-900 rounded-lg shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:bg-primary-600 dark:group-hover:bg-primary-500 transition-colors duration-200">
                    <info.icon className="text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-200" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900 dark:text-white text-sm sm:text-base transition-colors duration-300">{info.title}</h4>
                    <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base transition-colors duration-300">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-dark-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">Follow Me</h4>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target='_blank'
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-dark-900 rounded-lg flex items-center justify-center shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="text-dark-600 dark:text-dark-400 group-hover:text-white transition-colors duration-200" size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
