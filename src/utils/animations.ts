import { gsap } from 'gsap';

export const fadeInUp = (element: HTMLElement, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
};

export const fadeInLeft = (element: HTMLElement, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      x: -50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
};

export const fadeInRight = (element: HTMLElement, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      x: 50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
};

export const scaleIn = (element: HTMLElement, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

export const staggerAnimation = (elements: HTMLElement[], animation: (el: HTMLElement) => gsap.core.Tween, stagger = 0.1) => {
  const tl = gsap.timeline();
  
  elements.forEach((element, index) => {
    tl.add(animation(element), index * stagger);
  });
  
  return tl;
};