import { useEffect, useRef } from 'react';
import { worldMapPath } from '../data/worldMapDots';

const RAD = Math.PI / 180;
const TILT = 22 * RAD;
const SPIN_DEG_PER_SEC = 6;

// Land dots come from the equirectangular map (lon -170..180, lat 80..-58)
const land = (() => {
  const lam = [];
  const sinPhi = [];
  const cosPhi = [];
  const re = /M([\d.]+) ([\d.]+)h0/g;
  let m;
  while ((m = re.exec(worldMapPath))) {
    const lon = (+m[1] / 1000) * 350 - 170;
    const lat = 80 - (+m[2] / 394) * 138;
    lam.push(lon * RAD);
    sinPhi.push(Math.sin(lat * RAD));
    cosPhi.push(Math.cos(lat * RAD));
  }
  return { lam: Float32Array.from(lam), sinPhi: Float32Array.from(sinPhi), cosPhi: Float32Array.from(cosPhi), n: lam.length };
})();

const markers = [
  { lon: 55.3, lat: 25.2, color: '#f59e0b' },
  { lon: 80, lat: 18, color: '#a855f7' },
  { lon: 90.4, lat: 23.8, color: '#ef4444' },
];

const palette = {
  light: {
    sphere: ['#f5faff', '#c4dcfc', '#8db9f6'],
    land: [20, 92, 222],
    grid: 'rgba(255,255,255,0.45)',
    rim: 'rgba(255,255,255,0.9)',
  },
  dark: {
    sphere: ['#1d3f74', '#102a56', '#07152f'],
    land: [90, 160, 255],
    grid: 'rgba(120,170,255,0.16)',
    rim: 'rgba(120,180,255,0.55)',
  },
};

// Orthographic projection of (lam, phi) for a globe centred on lon0
const project = (lam, sinP, cosP, lon0, cosT, sinT) => {
  const dl = lam - lon0;
  const cosDl = Math.cos(dl);
  return [cosP * Math.sin(dl), cosT * sinP - sinT * cosP * cosDl, sinT * sinP + cosT * cosP * cosDl];
};

const RotatingGlobe = ({ isDark = false, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const colors = isDark ? palette.dark : palette.light;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let size = 0;
    let dpr = 1;
    let lon0 = 20 * RAD;
    let raf = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      draw(performance.now());
    };

    const strokeLine = (R, cx, cy, pts) => {
      let pen = false;
      ctx.beginPath();
      for (const [x, y, z] of pts) {
        if (z > 0) {
          if (pen) ctx.lineTo(cx + x * R, cy - y * R);
          else ctx.moveTo(cx + x * R, cy - y * R);
          pen = true;
        } else pen = false;
      }
      ctx.stroke();
    };

    const draw = (now) => {
      const px = size * dpr;
      const R = px / 2 - 4 * dpr;
      const cx = px / 2;
      const cy = px / 2;
      ctx.clearRect(0, 0, px, px);

      // Sphere body
      const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      g.addColorStop(0, colors.sphere[0]);
      g.addColorStop(0.55, colors.sphere[1]);
      g.addColorStop(1, colors.sphere[2]);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Graticule
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = dpr;
      for (let lonDeg = 0; lonDeg < 360; lonDeg += 20) {
        const pts = [];
        for (let latDeg = -90; latDeg <= 90; latDeg += 5) {
          pts.push(project(lonDeg * RAD, Math.sin(latDeg * RAD), Math.cos(latDeg * RAD), lon0, cosT, sinT));
        }
        strokeLine(R, cx, cy, pts);
      }
      for (let latDeg = -60; latDeg <= 60; latDeg += 20) {
        const sp = Math.sin(latDeg * RAD);
        const cp = Math.cos(latDeg * RAD);
        const pts = [];
        for (let lonDeg = 0; lonDeg <= 360; lonDeg += 5) pts.push(project(lonDeg * RAD, sp, cp, lon0, cosT, sinT));
        strokeLine(R, cx, cy, pts);
      }

      // Land dots
      const [lr, lg, lb] = colors.land;
      for (let i = 0; i < land.n; i++) {
        const [x, y, z] = project(land.lam[i], land.sinPhi[i], land.cosPhi[i], lon0, cosT, sinT);
        if (z <= 0.02) continue;
        ctx.fillStyle = `rgba(${lr},${lg},${lb},${0.35 + 0.55 * z})`;
        ctx.beginPath();
        ctx.arc(cx + x * R, cy - y * R, (0.9 + 1.1 * z) * dpr * (R / 300), 0, Math.PI * 2);
        ctx.fill();
      }

      // Office markers with a soft pulse
      const pulse = (Math.sin(now / 500) + 1) / 2;
      for (const { lon, lat, color } of markers) {
        const [x, y, z] = project(lon * RAD, Math.sin(lat * RAD), Math.cos(lat * RAD), lon0, cosT, sinT);
        if (z <= 0.08) continue;
        const mx = cx + x * R;
        const my = cy - y * R;
        const r = 5 * dpr * z;
        ctx.globalAlpha = 0.35 * (1 - pulse) * z;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(mx, my, r * (1.6 + pulse * 2.2), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = z;
        ctx.beginPath();
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();

      // Rim light
      ctx.strokeStyle = colors.rim;
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) { last = now; return; }
      if (last) lon0 -= ((now - last) / 1000) * SPIN_DEG_PER_SEC * RAD;
      last = now;
      draw(now);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);
    if (!reduceMotion) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default RotatingGlobe;
