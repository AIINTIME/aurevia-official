import { Fragment, useEffect, useRef, useState } from 'react';
import './reveal.css';
import { prefersReducedMotion } from './useReveal';

// Splits a heading into words so each one can slide up on reveal
export const Words = ({ text, start = 0 }) =>
  text.split(' ').map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="word">
        <span className="word-inner" style={{ '--w': start + i }}>{word}</span>
      </span>{' '}
    </Fragment>
  ));

// Number that counts up the first time it scrolls into view
export const CountUp = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const reduceMotion = prefersReducedMotion();
  const [value, setValue] = useState(reduceMotion ? to : 0);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return undefined;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / 1400, 1);
        setValue(Math.round(to * (1 - (1 - p) ** 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, reduceMotion]);
  return <span ref={ref}>{value}{suffix}</span>;
};
