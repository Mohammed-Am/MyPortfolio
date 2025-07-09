import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollAnimation = (
  animation: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  options: UseScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const tl = animation(element);

    ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 80%',
      end: options.end,
      scrub: options.scrub,
      pin: options.pin,
      animation: tl,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, options]);

  return elementRef;
};