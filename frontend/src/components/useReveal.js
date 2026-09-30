import { useEffect } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Adds .revealed to every [data-reveal] element inside `rootRef` once it enters the viewport
export const useScrollReveal = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('[data-reveal]');
    if (prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add('revealed'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
};

// Gentle parallax on [data-parallax] elements (moves relative to their parent's position)
export const useParallax = (rootRef) => {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const layers = Array.from(rootRef.current?.querySelectorAll('[data-parallax]') ?? []);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      layers.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty('--py', `${(progress * -36).toFixed(1)}px`);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [rootRef]);
};
