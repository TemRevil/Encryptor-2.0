'use client';

import { useEffect, useRef } from 'react';

const MIN_SPEED = 1.5;
const MAX_SPEED = 2.5;
const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

// Bouncing blobs behind a frosted-glass overlay. Ported from the old Canvas.js,
// but cleaned up to start once the elements are measured and to cancel its rAF
// loop on unmount (the original leaked a forever-running loop).
export default function Blobs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const blobEls = Array.from(root.querySelectorAll<HTMLElement>('.bouncing-blob'));
    if (blobEls.length === 0) return;

    const blobs = blobEls.map((el) => {
      const size = el.getBoundingClientRect().width;
      const initialX = randomNumber(0, window.innerWidth - size);
      const initialY = randomNumber(0, window.innerHeight - size);
      el.style.top = `${initialY}px`;
      el.style.left = `${initialX}px`;
      return {
        el,
        size,
        initialX,
        initialY,
        x: initialX,
        y: initialY,
        vx: randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1),
        vy: randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1),
      };
    });

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x >= window.innerWidth - b.size) { b.x = window.innerWidth - b.size; b.vx *= -1; }
        if (b.y >= window.innerHeight - b.size) { b.y = window.innerHeight - b.size; b.vy *= -1; }
        if (b.x <= 0) { b.x = 0; b.vx *= -1; }
        if (b.y <= 0) { b.y = 0; b.vy *= -1; }
        b.el.style.transform = `translate(${b.x - b.initialX}px, ${b.y - b.initialY}px)`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="bouncing-blobs-container" ref={containerRef} aria-hidden="true">
      <div className="bouncing-blobs-glass" />
      <div className="bouncing-blobs">
        <div className="bouncing-blob bouncing-blob--blue" />
        <div className="bouncing-blob bouncing-blob--blue" />
        <div className="bouncing-blob bouncing-blob--blue" />
        <div className="bouncing-blob bouncing-blob--blue-2" />
        <div className="bouncing-blob bouncing-blob--blue-2" />
        <div className="bouncing-blob bouncing-blob--purple" />
        <div className="bouncing-blob bouncing-blob--purple" />
        <div className="bouncing-blob bouncing-blob--blue-3" />
      </div>
    </div>
  );
}
