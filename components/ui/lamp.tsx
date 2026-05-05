"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const lampTransition = { delay: 0.3, duration: 0.8, ease: "easeInOut" as const };

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const glowRef       = useRef<HTMLDivElement>(null);
  const beamLeftRef   = useRef<HTMLDivElement>(null);
  const beamRightRef  = useRef<HTMLDivElement>(null);
  const glowBlobRef   = useRef<HTMLDivElement>(null);
  const childrenRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 1. Lamp line turns on — scales from center outward
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.45, ease: "power2.out" }
    );

    // 2. Lamp source glow drops down from the line
    tl.fromTo(glowRef.current,
      { opacity: 0, y: -30, scale: 0.4 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
      "-=0.15"
    );

    // 3. Left + right beams fan outward simultaneously
    tl.fromTo(beamLeftRef.current,
      { width: "0px", opacity: 0 },
      { width: "480px", opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );
    tl.fromTo(beamRightRef.current,
      { width: "0px", opacity: 0 },
      { width: "480px", opacity: 1, duration: 0.8, ease: "power2.out" },
      "<"
    );

    // 4. Glow pool expands downward
    tl.fromTo(glowBlobRef.current,
      { opacity: 0, scaleX: 0.1 },
      { opacity: 0.5, scaleX: 1, duration: 0.6, ease: "power1.out" },
      "-=0.4"
    );

    // 5. Text rises up into the light
    tl.fromTo(childrenRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
      "-=0.3"
    );

    // Refresh after Next.js finishes layout
    const id = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(id);
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">

        {/* Left beam */}
        <div
          ref={beamLeftRef}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            width: 0,
            opacity: 0,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>

        {/* Right beam */}
        <div
          ref={beamRightRef}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            width: 0,
            opacity: 0,
          }}
          className="absolute inset-auto left-1/2 h-56 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Bottom glow pool */}
        <div
          ref={glowBlobRef}
          style={{ opacity: 0 }}
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 blur-3xl"
        />

        {/* Lamp source glow */}
        <div
          ref={glowRef}
          style={{ opacity: 0 }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />

        {/* Lamp line — first to appear */}
        <div
          ref={lineRef}
          style={{ opacity: 0, transformOrigin: "center center" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />
      </div>

      <div
        ref={childrenRef}
        style={{ opacity: 0 }}
        className="relative z-50 flex -translate-y-80 flex-col items-center px-5"
      >
        {children}
      </div>
    </div>
  );
};
