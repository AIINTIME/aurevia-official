// Inline SVG flags (emoji flags don't render on Windows) and the country silhouette shown on each office card.
import { countryShapes } from '../../data/countryShapes';

export const Flag = ({ code, width = 38 }) => {
  const h = (width * 2) / 3;
  return (
    <svg className="ct-flag-svg" width={width} height={h} viewBox="0 0 36 24" role="img" aria-hidden="true">
      <defs>
        <clipPath id={`flag-clip-${code}`}><rect width="36" height="24" rx="3.5" /></clipPath>
      </defs>
      <g clipPath={`url(#flag-clip-${code})`}>
        {code === 'IN' && (
          <>
            <rect width="36" height="8" fill="#ff9933" />
            <rect y="8" width="36" height="8" fill="#fff" />
            <rect y="16" width="36" height="8" fill="#138808" />
            <circle cx="18" cy="12" r="3" fill="none" stroke="#000080" strokeWidth="0.7" />
            <circle cx="18" cy="12" r="0.7" fill="#000080" />
          </>
        )}
        {code === 'AE' && (
          <>
            <rect width="36" height="8" fill="#00732f" />
            <rect y="8" width="36" height="8" fill="#fff" />
            <rect y="16" width="36" height="8" fill="#000" />
            <rect width="10" height="24" fill="#ff0000" />
          </>
        )}
        {code === 'BD' && (
          <>
            <rect width="36" height="24" fill="#006a4e" />
            <circle cx="16" cy="12" r="7" fill="#f42a41" />
          </>
        )}
      </g>
    </svg>
  );
};

export const CountryArt = ({ code }) => {
  const { d, dot } = countryShapes[code.toLowerCase()];
  const fill = `ct-cs-fill-${code}`;
  const glow = `ct-cs-glow-${code}`;
  return (
    <svg className="ct-country" viewBox="-24 -24 248 248" aria-hidden="true">
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--cc)', stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: 'var(--cc)', stopOpacity: 0.22 }} />
        </linearGradient>
        <radialGradient id={glow} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" style={{ stopColor: '#fff', stopOpacity: 0.9 }} />
          <stop offset="0.6" style={{ stopColor: 'var(--cc)', stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: 'var(--cc)', stopOpacity: 0.03 }} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="122" className="ct-cs-ring" />
      <circle cx="100" cy="100" r="108" className="ct-cs-ring ct-cs-dash" />
      <circle cx="100" cy="100" r="96" fill={`url(#${glow})`} />
      <path d={d} fill={`url(#${fill})`} stroke="var(--cc)" strokeOpacity="0.35" strokeWidth="1" strokeLinejoin="round" />
      <circle cx={dot[0]} cy={dot[1]} r="15" className="ct-cs-pulse" />
      <circle cx={dot[0]} cy={dot[1]} r="10" fill="var(--cc)" stroke="#fff" strokeWidth="2.5" />
      <circle cx={dot[0]} cy={dot[1]} r="3.4" fill="#fff" />
    </svg>
  );
};
