import { useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  Globe,
  Users,
  BadgeCheck,
  Target,
  Rocket,
  MapPin,
  TriangleAlert,
  RefreshCw,
  Headset,
  ChartColumn,
  Layers,
  Bot,
  Cpu,
  Building2,
  Factory,
  FolderCheck,
  Quote,
} from 'lucide-react';
import './About.css';
import Navbar from '../../components/Navbar';
import { Words, CountUp } from '../../components/Reveal';
import { useScrollReveal, useParallax } from '../../components/useReveal';
import { socialLinks } from '../../data/socialLinks';

const heroStats = [
  { Icon: Globe, to: 3, suffix: '+', title: 'Countries', sub: 'Global Presence' },
  { Icon: Users, to: 200, suffix: '+', title: 'Consultants', sub: 'Expert Team' },
  { Icon: BadgeCheck, to: 95, suffix: '%', title: 'Success Rate', sub: 'Client Satisfaction' },
];

const pillars = [
  {
    Icon: Target,
    title: 'Our Mission',
    text: 'Empowering enterprises to become more agile and data-driven through intelligent, scalable, and future-ready solutions.',
  },
  {
    Icon: Rocket,
    title: 'Our Vision',
    text: 'To be the global leader in driving intelligent growth and enterprise value across innovation and integrity.',
  },
  {
    Icon: MapPin,
    title: 'Our Philosophy',
    text: 'Innovation is at the core of everything we do. We believe in the power of technology to shape the future, for a better world.',
  },
];

const shiftCards = [
  { tone: 'red', Icon: TriangleAlert, title: 'The Challenge', text: 'Traditional enterprise systems are no longer enough to keep up with today’s global business landscape.' },
  { tone: 'green', Icon: RefreshCw, title: 'From Then To Now', text: 'We help businesses transition from today’s processes to fully autonomous, AI-powered systems for the future.' },
  { tone: 'orange', Icon: Headset, title: 'Customer-Centric Focus', text: 'Delivering solutions that create real business value.' },
  { tone: 'blue', Icon: ChartColumn, title: 'Data-Driven Decisions', text: 'Harnessing data, analytics, and intelligence for smarter outcomes.' },
  { tone: 'amber', Icon: Layers, title: 'Agile Infrastructure', text: 'Building flexible, cloud-native foundations for continuous growth.' },
  { tone: 'purple', Icon: Bot, title: 'Intelligent Automation', text: 'Automating processes with AI to unlock productivity and scale.' },
];

const timeline = [
  { year: '2015', title: 'Company Founded', text: 'Started with a vision to empower businesses with intelligent solutions.' },
  { year: '2017', title: 'Global Expansion', text: 'Expanded our operations across the Middle East, Europe and Asia.' },
  { year: '2019', title: 'AI Integration', text: 'Introduced AI-driven solutions to help clients scale faster.' },
  { year: '2021', title: '200+ Consultants', text: 'Built a strong global team of 200+ experts across multiple domains.' },
  { year: '2024', title: 'Strategic Partnerships', text: 'Formed key alliances to bring the best innovation to our clients.' },
  { year: '2025', title: 'Innovating at Scale', text: 'Continuing our mission to build autonomous enterprises for a smarter future.' },
];

const reachStats = [
  { Icon: FolderCheck, to: 50, suffix: '+', label: 'Projects Completed' },
  { Icon: Cpu, to: 20, suffix: '+', label: 'Countries Served' },
  { Icon: Building2, to: 3, suffix: '', label: 'Regional Offices' },
  { Icon: Factory, to: 8, suffix: '+', label: 'Client Industries' },
];

const offices = [
  {
    flag: '🇮🇳',
    country: 'India',
    role: 'Global HQ',
    company: 'INTIME IT SERVICES PVT LTD',
    addressLabel: 'Kolkata Address',
    address: [<>3016-MIRAKUNJ, 3<sup>RD</sup> FLOOR,</>, 'RAJDANGA MAIN ROAD, KASBA,', 'KOLKATA-700107, WEST BENGAL'],
  },
  {
    flag: '🇦🇪',
    country: 'UAE (Dubai)',
    role: 'Middle East Hub',
    company: 'AUREVIATECH SOLUTIONS - FZCO',
    addressLabel: 'Dubai Address',
    address: ['Premises No: DSO-DDP-A5-D-FLEX-G114,', 'Building Name: A5,', 'Area Name: Dubai Silicon Oasis'],
  },
  {
    flag: '🇧🇩',
    country: 'Bangladesh',
    role: 'Regional Office',
    company: 'INTIME IT SERVICES PVT LTD',
    addressLabel: 'Bangladesh Address',
    address: ['57/16, East Rajabazar, West Panthapath,', 'Sher-E-Bangla Nagar,', 'Dhaka-1215; Bangladesh'],
  },
];

const footerColumns = [
  { title: 'What We Do', links: ['AI & Intelligent Automation', 'SAP Consulting & Support', 'Business Intelligence & Analytics', 'Cloud Transformation', 'Enterprise Technology Solutions'] },
  { title: 'Company', links: ['About Us', 'Projects', 'Careers', 'Contact Us'] },
  { title: 'Legal & Support', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d={socialLinks[0].path} />
  </svg>
);

const About = () => {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);
  useParallax(rootRef);

  const [founderLoaded, setFounderLoaded] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('aurevia_theme') === 'dark');
  const toggleTheme = () => {
    setIsDark((prev) => {
      localStorage.setItem('aurevia_theme', prev ? 'light' : 'dark');
      return !prev;
    });
  };

  return (
    <div ref={rootRef} className={`about-page ${isDark ? 'dark' : 'light'}`}>
      {/* ── Hero ── */}
      <section className="ab-hero">
        <Navbar page="about" isDarkMode={isDark} onToggleTheme={toggleTheme} />
        <div className="ab-hero-media" aria-hidden="true">
          <img src="/images/about-hero.jpg" alt="" data-parallax />
        </div>
        <div className="ab-container ab-hero-inner">
          <div className="ab-hero-copy">
            <span className="ab-pill" data-reveal="up">ABOUT AUREVIA</span>
            <h1 className="ab-hero-title" data-reveal="words">
              <Words text="We Are" /><br />
              <span className="ab-accent"><Words text="InTime Global" start={2} /></span>
            </h1>
            <p className="ab-hero-desc" data-reveal="up" style={{ '--d': '250ms' }}>
              Architects of our autonomous future. We empower enterprises with AI,
              SAP, and BI expertise across the Middle East, Europe, Asia, and beyond.
            </p>
            <div className="ab-hero-actions" data-reveal="up" style={{ '--d': '380ms' }}>
              <a href="#/about" className="ab-btn-primary">
                <span>Discover Our Vision</span>
                <ArrowRight size={14} />
              </a>
              <a href="#/contact" className="ab-btn-light">Work With Us</a>
            </div>

            <div className="ab-hero-stats">
              {heroStats.map(({ Icon, to, suffix, title, sub }, i) => (
                <div key={title} className="ab-stat-glass" data-reveal="up" style={{ '--d': `${480 + i * 120}ms` }}>
                  <span className="ab-icon-chip"><Icon size={16} strokeWidth={1.8} /></span>
                  <strong><CountUp to={to} suffix={suffix} /></strong>
                  <b>{title}</b>
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-global-impact" data-reveal="zoom" style={{ '--d': '700ms' }}>
            <span className="ab-globe-badge"><Globe size={20} strokeWidth={1.8} /></span>
            <div>
              <strong>Global Impact</strong>
              <span>People &bull; Innovation &bull; Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="ab-section ab-philosophy">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">OUR PHILOSOPHY</span>
            <h2 className="ab-title" data-reveal="words">
              <Words text="Pioneering the Next Era of" /><br />
              <span className="ab-accent"><Words text="Enterprise Excellence" start={5} /></span>
            </h2>
            <p className="ab-sub" data-reveal="up" style={{ '--d': '250ms' }}>
              Our approach is not just about digital transformation but creating
              sustainable ecosystems for business success.
            </p>
          </header>

          <div className="ab-pillars">
            {pillars.map(({ Icon, title, text }, i) => (
              <article key={title} className="ab-card ab-pillar" data-reveal="up" style={{ '--d': `${i * 120}ms` }}>
                <span className="ab-icon-chip ab-icon-chip-lg"><Icon size={18} strokeWidth={1.8} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="ab-section ab-approach">
        <div className="ab-approach-glow" aria-hidden="true"></div>
        <div className="ab-container ab-approach-grid">
          <div className="ab-approach-visual" data-reveal="clip-left">
            <img src="/images/about-team-2.jpg" alt="Team collaborating in a modern office" loading="lazy" />
            <div className="ab-ideas-card" data-reveal="up" style={{ '--d': '500ms' }}>
              <span className="ab-icon-chip ab-icon-chip-solid"><ChartColumn size={18} strokeWidth={2} /></span>
              <strong>From Ideas<br />To Impact</strong>
            </div>
          </div>

          <div className="ab-approach-copy">
            <span className="ab-pill" data-reveal="up">OUR APPROACH</span>
            <h2 className="ab-title ab-title-left" data-reveal="words">
              <Words text="The Inevitable Shift: Towards the" /><br />
              <span className="ab-accent"><Words text="Autonomous Enterprise" start={5} /></span>
            </h2>

            <div className="ab-shift-grid">
              {shiftCards.map(({ tone, Icon, title, text }, i) => (
                <article key={title} className={`ab-shift ab-tone-${tone}`} data-reveal="up" style={{ '--d': `${i * 90}ms` }}>
                  <span className="ab-shift-icon"><Icon size={15} strokeWidth={1.9} /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="ab-section ab-founder">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">LEADERSHIP</span>
            <h2 className="ab-title" data-reveal="words">
              <Words text="A Perspective From" /><span className="ab-accent"><Words text="Our Founder" start={3} /></span>
            </h2>
            <p className="ab-sub" data-reveal="up" style={{ '--d': '250ms' }}>
              A vision to empower organizations through technology, people, and purpose.
            </p>
          </header>

          <div className="ab-founder-grid">
            <div className="ab-founder-photo" data-reveal="left">
              <div className="ab-photo-frame">
                {!founderLoaded && (
                  <div className="ab-photo-placeholder" role="img" aria-label="Founder portrait placeholder">
                    <Users size={56} strokeWidth={1.2} />
                  </div>
                )}
                <img
                  src="/images/founder.jpg"
                  alt="Soumyojit Das, Founder & CEO of InTime Global"
                  loading="lazy"
                  onLoad={() => setFounderLoaded(true)}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
            <figure className="ab-card ab-quote-card" data-reveal="right" style={{ '--d': '150ms' }}>
              <svg className="ab-quote-waves" viewBox="0 0 420 380" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="qwA" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7db2ff" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#dbe9ff" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="qwB" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#cfe1ff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#8dbaff" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path d="M420 0 C 330 30, 250 110, 260 230 C 265 300, 200 340, 150 380 L 420 380 Z" fill="url(#qwA)" />
                <path d="M420 120 C 340 130, 250 200, 230 300 C 222 340, 190 365, 120 380 L 420 380 Z" fill="url(#qwB)" />
                <path className="qw-line" d="M60 380 C 150 350, 230 300, 285 215 C 335 140, 380 118, 420 108" fill="none" stroke="#1a6bff" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="ab-quote-mark"><Quote size={26} fill="currentColor" strokeWidth={0} /></span>
              <div className="ab-quote-body">
                <blockquote>
                  <p>
                    In 2015, while working in a global setup, the transformative power of
                    intelligent systems inspired me to envision a future where businesses
                    operate autonomously. InTime Global was born out of that vision — to
                    empower organizations with technology that drives real, measurable impact.
                  </p>
                  <p>
                    Today, we are proud to be a trusted partner for enterprises across the
                    Middle East, Europe, Asia, and beyond, helping them achieve sustainable
                    growth through innovation, people, and purpose.
                  </p>
                </blockquote>
                <figcaption>
                  <strong>Soumyojit Das</strong>
                  <span>Founder &amp; CEO, InTime Global</span>
                </figcaption>
              </div>
              <a href="#/about" className="ab-linkedin" aria-label="LinkedIn"><LinkedInIcon /></a>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Journey ── */}
      <section className="ab-section ab-journey">
        <div className="ab-map-dots" aria-hidden="true"></div>
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">OUR JOURNEY</span>
            <h2 className="ab-title" data-reveal="words">
              <Words text="A Decade of Driving" /><br />
              <span className="ab-accent"><Words text="Enterprise Transformation" start={4} /></span>
            </h2>
            <p className="ab-sub" data-reveal="up" style={{ '--d': '250ms' }}>
              Our journey is marked by innovation, growth, and seamless pursuit of excellence.
            </p>
          </header>

          <ol className="ab-timeline">
            {timeline.map(({ year, title, text }, i) => (
              <li key={year} className={`ab-tl-item ${i % 2 === 0 ? 'right' : 'left'}`}>
                <span className="ab-tl-dot" data-reveal="zoom"></span>
                <article
                  className="ab-card ab-tl-card"
                  data-reveal={i % 2 === 0 ? 'right' : 'left'}
                >
                  <span className="ab-tl-year">{year}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Global reach ── */}
      <section className="ab-section ab-reach">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">OUR GLOBAL REACH</span>
            <h2 className="ab-title" data-reveal="words">
              <Words text="Global Expertise, Local Insight," /><br />
              <span className="ab-accent"><Words text="Unified Delivery" start={4} /></span>
            </h2>
            <p className="ab-sub" data-reveal="up" style={{ '--d': '250ms' }}>
              We serve clients across the globe with a focus on delivering value and excellence.
            </p>
          </header>

          <div className="ab-reach-stats">
            {reachStats.map(({ Icon, to, suffix, label }, i) => (
              <div key={label} className="ab-card ab-reach-stat" data-reveal="up" style={{ '--d': `${i * 100}ms` }}>
                <span className="ab-icon-chip ab-icon-chip-lg"><Icon size={18} strokeWidth={1.8} /></span>
                <div>
                  <strong><CountUp to={to} suffix={suffix} /></strong>
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="ab-offices-title" data-reveal="up">Our Global Offices</h3>
          <div className="ab-offices">
            {offices.map(({ flag, country, role, company, addressLabel, address }, i) => (
              <article key={country} className="ab-card ab-office" data-reveal="up" style={{ '--d': `${i * 120}ms` }}>
                <span className="ab-flag" aria-hidden="true">{flag}</span>
                <h4>{country}</h4>
                <em>{role}</em>
                <strong>{company}</strong>
                <span className="ab-office-label">{addressLabel}</span>
                {address.map((line, k) => <p key={k}>{line}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ab-cta-wrap">
        <div className="ab-container">
          <div className="ab-cta" data-reveal="up">
            <div className="ab-cta-media" aria-hidden="true">
              <img src="/images/about-cta-bg.jpg" alt="" />
            </div>
            <div className="ab-cta-copy">
              <h2>Ready to Start Your Digital Journey?</h2>
              <p>Let&apos;s build smarter, autonomous enterprises together.</p>
              <a href="#/contact" className="ab-btn-white">
                <span>Get in Touch</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="ab-footer">
        <div className="ab-container ab-footer-grid">
          <div className="ab-footer-brand" data-reveal="up">
            <a href="#/" aria-label="Aurevia home"><img src="/images/aurevia-logo.png" alt="Aurevia" /></a>
            <p>Empowering enterprises through intelligent solutions for a smarter tomorrow.</p>
            <div className="ab-socials">
              {socialLinks.map(({ label, path }) => (
                <a key={label} href="#/about" aria-label={label}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
                </a>
              ))}
            </div>
            <span className="ab-locations"><MapPin size={12} /> Kolkata &bull; Dubai &bull; Dhaka</span>
          </div>
          {footerColumns.map(({ title, links }, i) => (
            <nav key={title} className="ab-footer-col" aria-label={title} data-reveal="up" style={{ '--d': `${(i + 1) * 100}ms` }}>
              <h4>{title}</h4>
              <ul>{links.map((l) => <li key={l}><a href="#/about">{l}</a></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="ab-container ab-footer-bottom">
          <span>&copy; {new Date().getFullYear()} InTime Global. All rights reserved.</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default About;
