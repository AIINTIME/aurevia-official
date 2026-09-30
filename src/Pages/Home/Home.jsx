import { Fragment, useState, useRef, useEffect } from 'react';
import {
  Rocket,
  Briefcase,
  CloudUpload,
  Database,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
  Heart,
  ChartColumn,
  Target,
  Lightbulb,
  Settings,
  FolderCheck,
  Star,
  Quote,
  Send,
} from 'lucide-react';
import './Home.css';
import Navbar from '../../components/Navbar';
import { Words, CountUp } from '../../components/Reveal';
import { useScrollReveal, useParallax } from '../../components/useReveal';
import { socialLinks } from '../../data/socialLinks';

import brand1 from '../../assets/Brand Logos/Brand1.png';
import brand2 from '../../assets/Brand Logos/Brand2.png';
import brand3 from '../../assets/Brand Logos/Brand3.png';
import brand4 from '../../assets/Brand Logos/Brand4.png';
import brand5 from '../../assets/Brand Logos/Brand5.png';
import brand6 from '../../assets/Brand Logos/Brand6.png';
import brand7 from '../../assets/Brand Logos/Brand7.png';
import brand8 from '../../assets/Brand Logos/Brand8.png';
import brand9 from '../../assets/Brand Logos/Brand9.png';
import brand10 from '../../assets/Brand Logos/Brand10.png';
import brand11 from '../../assets/Brand Logos/Brand11.png';
import brand12 from '../../assets/Brand Logos/Brand12.png';
import brand13 from '../../assets/Brand Logos/Brand13.png';
import brand14 from '../../assets/Brand Logos/Brand14.png';
import brand15 from '../../assets/Brand Logos/Brand15.png';

const brandLogos = [
  brand1, brand2, brand3, brand4, brand5,
  brand6, brand7, brand8, brand9, brand10,
  brand11, brand12, brand13, brand14, brand15,
];

const servicesData = [
  {
    id: 'digital-transformation',
    Icon: Rocket,
    variant: 'sky',
    title: 'Digital Transformation',
    description: 'Modernize your business with cutting-edge digital solutions that create lasting value.',
    href: '#digital-transformation',
  },
  {
    id: 'it-consulting',
    Icon: Briefcase,
    variant: 'green',
    title: 'IT Consulting',
    description: 'Expert guidance to optimize systems and drive operational efficiency.',
    href: '#it-consulting',
  },
  {
    id: 'cloud-solutions',
    Icon: CloudUpload,
    variant: 'purple',
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud solutions for the modern enterprise.',
    href: '#cloud-solutions',
  },
  {
    id: 'data-analytics',
    Icon: Database,
    variant: 'orange',
    title: 'Data & Analytics',
    description: 'Turn data into actionable insights and accelerate growth.',
    href: '#data-analytics',
  },
];

const aboutFeatures = [
  {
    Icon: ShieldCheck,
    title: 'Certified Company',
    text: 'Recognized for quality, security, and excellence in delivery.',
  },
  {
    Icon: Users,
    title: 'Expert Team',
    text: 'A diverse team of industry experts and technologists.',
  },
  {
    Icon: Heart,
    title: 'Client-Centric Approach',
    text: 'Your success is our priority. We build long-term partnerships.',
  },
];

const processSteps = [
  { num: '01', Icon: Target, variant: 'green', anim: 'pulse', title: 'Discover', text: 'Understand your goals, challenges, and opportunities.' },
  { num: '02', Icon: Lightbulb, variant: 'sky', anim: 'glow', title: 'Plan', text: 'Create a tailored strategy and roadmap.' },
  { num: '03', Icon: Settings, variant: 'purple', anim: 'spin', title: 'Execute', text: 'Build and deploy scalable solutions.' },
  { num: '04', Icon: ChartColumn, variant: 'orange', anim: 'bob', title: 'Grow', text: 'Measure results and optimize for continuous improvement.' },
];

const whyStats = [
  { Icon: Users, variant: 'sky', to: 100, suffix: '+', label: 'Global Clients' },
  { Icon: FolderCheck, variant: 'sky', to: 250, suffix: '+', label: 'Projects Delivered' },
  { Icon: Star, variant: 'orange', to: 98, suffix: '%', label: 'Client Satisfaction' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'CTO, FinEdge',
    initials: 'PS',
    text: 'Aurevia has been a trusted technology partner for us. Their team understands our business and consistently delivers high-quality solutions.',
  },
  {
    name: 'Rohan Mehta',
    role: 'Head of IT, NexaCorp',
    initials: 'RM',
    text: 'The team brings deep expertise and a collaborative approach. They helped us accelerate our digital transformation journey.',
  },
  {
    name: 'Ananya Rao',
    role: 'Director, SkyTech',
    initials: 'AR',
    text: 'Professional, innovative, and reliable. Their solutions have significantly improved our operational efficiency.',
  },
];

const footerColumns = [
  { title: 'Services', links: ['Digital Transformation', 'IT Consulting', 'Cloud Solutions', 'Data & Analytics', 'Managed Services'] },
  { title: 'Company', links: ['About Us', 'Our Process', 'Careers', 'Blog', 'Contact'] },
  { title: 'Resources', links: ['Case Studies', 'Whitepapers', 'Events', 'Support', 'FAQ'] },
];

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('aurevia_theme');
    return saved === 'dark';
  });
  const [testimonialStart, setTestimonialStart] = useState(0);
  const [email, setEmail] = useState('');

  const rootRef = useRef(null);
  useScrollReveal(rootRef);
  useParallax(rootRef);

  // Reveal the process timeline once it scrolls into view
  const processRef = useRef(null);
  const [processInView, setProcessInView] = useState(false);
  useEffect(() => {
    const el = processRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProcessInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('aurevia_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Brand carousel
  const carouselTrackRef = useRef(null);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    let animId;
    const scroll = () => {
      const el = carouselTrackRef.current;
      if (el && !carouselPaused) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [carouselPaused]);

  return (
    <div ref={rootRef} className={`home-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* ── Above-the-fold viewport: fills exactly 100vh ── */}
      <div className="hero-viewport">
        {/* Full Hero Animated Video Background (Dual Video for Seamless Crossfade) */}
        <div className="hero-video-container" aria-hidden="true">
          {/* Light Mode Video */}
          <video
            className={`hero-video-element light-video ${!isDarkMode ? 'active' : ''}`}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/Aurevia Background Video.mp4" type="video/mp4" />
          </video>

          {/* Dark Mode Video */}
          <video
            className={`hero-video-element dark-video ${isDarkMode ? 'active' : ''}`}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/Dark Mode Video.mp4" type="video/mp4" />
          </video>

          {/* Dynamic Atmospheric Gradient Overlay */}
          <div className={`hero-video-gradient-overlay ${isDarkMode ? 'dark' : 'light'}`}></div>
        </div>

        <Navbar page="home" isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

        {/* Hero Section */}
        <main className="hero-section">
          <div className="hero-content-wrapper">
            {/* Left Column: Text & CTAs */}
            <div className="hero-left-column">
              {/* Top Sub-tagline */}
              <div className="hero-eyebrow">AI POWERING PROGRESS</div>

              {/* Main Headline */}
              <h1 className="hero-headline">
                <span className="headline-line-1">Enterprise Intelligence,</span>
                <span className="headline-line-2">
                  Architected<span className="headline-blue-dot">.</span>
                </span>
              </h1>

              {/* Decorative Blue Accent Divider */}
              <div className="hero-accent-divider"></div>

              {/* Description */}
              <p className="hero-description">
                We design private, governed, enterprise-grade AI systems.<br />
                Our software powers real-time, AI-driven decisions across<br />
                data infrastructure, business intelligence, and enterprise systems.
              </p>

              {/* Action Buttons */}
              <div className="hero-actions">
                <button className="btn-get-started" type="button">
                  <span>Get Started</span>
                  <svg className="btn-icon-arrow" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="btn-view-services" type="button">
                  <span>View All Services</span>
                  <svg className="btn-icon-chevron" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: empty — building image is in its own layer */}
            <div className="hero-right-column" aria-hidden="true"></div>
          </div>
        </main>

        {/* Brand Carousel — scrolling company logos */}
        <section
          className="partners-logo-bar"
          aria-label="Trusted Partners"
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
        >
          <div className="carousel-container-relative">
            <div className="carousel-track-wrapper js-scroll" ref={carouselTrackRef}>
              <div className="carousel-track no-anim">
                {[...brandLogos, ...brandLogos].map((logo, i) => (
                  <div className="carousel-item-logo" key={i}>
                    <div
                      className="gradient-logo-wrapper"
                      style={{
                        WebkitMaskImage: `url(${logo})`,
                        maskImage: `url(${logo})`,
                      }}
                    >
                      <img src={logo} alt={`Brand ${i}`} className="logo-img-invisible" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>{/* end .hero-viewport */}

      {/* ── What We Do / Solutions ── */}
      <section className="services-section" id="services" aria-labelledby="services-heading">
        <div className="section-container">
          <div className="services-header-row">
            <div className="services-header-left">
              <span className="section-eyebrow" data-reveal="up">WHAT WE DO</span>
              <h2 id="services-heading" className="section-title" data-reveal="words">
                <Words text="Solutions that" /><br />
                <Words text="Drive" start={2} /><span className="text-accent"><Words text="Real Impact" start={3} /></span>
              </h2>
              <p className="section-lead" data-reveal="up" style={{ '--d': '250ms' }}>
                We combine industry expertise, modern technology, and a
                people-first approach to help organizations innovate, scale,
                and stay ahead.
              </p>
            </div>

            <div className="services-header-right" data-reveal="left" style={{ '--d': '300ms' }}>
              <p className="services-header-desc">
                From strategy to execution, we provide end-to-end services tailored to your business goals.
              </p>
              <a href="#services" className="link-arrow">
                <span>Explore All Services</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="services-cards-grid">
            {servicesData.map(({ id, Icon, variant, title, description, href }, i) => (
              <article key={id} className="service-card" data-reveal="up" style={{ '--d': `${i * 110}ms` }}>
                <div className={`icon-badge tone-${variant}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="service-card-title">{title}</h3>
                <p className="service-card-desc">{description}</p>
                <a href={href} className="link-arrow link-arrow-sm">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="about-section" id="about" aria-labelledby="about-heading">
        <div className="about-glow" aria-hidden="true"></div>
        <div className="section-container about-grid">
          <div className="about-visual">
            <div className="about-photo about-photo-main" data-reveal="clip-left">
              <img src="/images/about-team-2.jpg" alt="Aurevia team in a strategy meeting" loading="lazy" />
            </div>
            <div className="about-dots" aria-hidden="true" data-reveal="fade" style={{ '--d': '500ms' }}></div>
            <div className="about-photo about-photo-secondary" data-reveal="clip-right" style={{ '--d': '250ms' }}>
              <img src="/images/about-team-1.jpg" alt="Engineers reviewing code together" loading="lazy" />
            </div>
            <div className="about-experience-card" data-reveal="zoom" style={{ '--d': '600ms' }}>
              <span className="icon-badge tone-sky icon-badge-sm">
                <ChartColumn size={20} strokeWidth={1.8} />
              </span>
              <div>
                <strong><CountUp to={10} suffix="+" /></strong>
                <span>Years of Experience</span>
              </div>
              <span className="experience-arrow" aria-hidden="true">
                <ArrowRight size={15} />
              </span>
            </div>
          </div>

          <div className="about-content">
            <span className="section-eyebrow" data-reveal="up">ABOUT US</span>
            <h2 id="about-heading" className="section-title" data-reveal="words">
              <Words text="We Help IT Companies" /><br />
              <Words text="Scale" start={4} /><span className="text-accent"><Words text="Engineering Capacity" start={5} /></span>
            </h2>
            <p className="section-lead about-lead" data-reveal="up" style={{ '--d': '250ms' }}>
              We partner with organizations to build, optimize, and scale their
              technology teams. With a strong focus on innovation and execution,
              we deliver solutions that help businesses move faster and achieve
              measurable results.
            </p>

            <ul className="about-feature-list">
              {aboutFeatures.map(({ Icon, title, text }, i) => (
                <li key={title} className="about-feature" data-reveal="right" style={{ '--d': `${i * 130}ms` }}>
                  <Icon size={24} strokeWidth={2} className="about-feature-icon" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="process-section" id="process" aria-labelledby="process-heading">
        <div className="section-container">
          <div className="process-header">
            <div>
              <span className="section-eyebrow" data-reveal="up">OUR PROCESS</span>
              <h2 id="process-heading" className="section-title" data-reveal="words">
                <Words text="A Smarter Approach" /><br />
                <Words text="to" start={3} /><span className="text-accent"><Words text="Real Results" start={4} /></span>
              </h2>
              <p className="section-lead" data-reveal="up" style={{ '--d': '250ms' }}>
                We follow a proven, collaborative process to turn
                ideas into measurable business outcomes.
              </p>
            </div>
            <a href="#process" className="btn-outline-pill" data-reveal="left" style={{ '--d': '300ms' }}>
              <span>Our Process</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <ol ref={processRef} className={`process-steps ${processInView ? 'in-view' : ''}`}>
            {processSteps.map(({ num, Icon, variant, anim, title, text }, i) => (
              <Fragment key={num}>
                <li className={`process-card tone-${variant}`} style={{ '--i': i }}>
                  <span className={`process-icon anim-${anim}`} aria-hidden="true">
                    <Icon size={28} strokeWidth={1.8} />
                  </span>
                  <span className="process-num">{num}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="process-bar" aria-hidden="true"></span>
                </li>
                {i < processSteps.length - 1 && (
                  <li
                    className={`process-connector tone-${variant} next-${processSteps[i + 1].variant}`}
                    style={{ '--i': i }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 100 190" preserveAspectRatio="none">
                      <path className="path-a" d="M0 52 C 24 58, 26 88, 50 104" />
                      <path className="path-b" d="M100 52 C 76 58, 74 88, 50 104" />
                    </svg>
                    <span className="process-arrow">
                      <ArrowRight size={18} strokeWidth={2.2} />
                    </span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="why-section" aria-labelledby="why-heading">
        <div className="why-banner" aria-hidden="true">
          <div className="why-bg">
            <img src="/images/why-choose-us-bg.jpg" alt="" loading="lazy" data-parallax />
          </div>
        </div>
        <div className="section-container why-inner">
          <div className="why-panel" data-reveal="left">
            <span className="section-eyebrow" data-reveal="up" style={{ '--d': '150ms' }}>WHY CHOOSE US</span>
            <h2 id="why-heading" className="section-title" data-reveal="words">
              <Words text="Built for Today." start={1} /><br />
              <Words text="Ready for" start={4} /><span className="text-accent"><Words text="Tomorrow." start={6} /></span>
            </h2>
            <p className="section-lead" data-reveal="up" style={{ '--d': '450ms' }}>
              We combine deep technical expertise with a strong understanding
              of business needs to deliver solutions that create real, measurable impact.
            </p>
            <a href="#contact" className="btn-primary" data-reveal="up" style={{ '--d': '600ms' }}>
              <span>Talk to Our Experts</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="why-stats">
            {whyStats.map(({ Icon, variant, to, suffix, label }, i) => (
              <div key={label} className="why-stat-card" data-reveal="right" style={{ '--d': `${i * 120}ms` }}>
                <span className={`icon-badge icon-badge-sm tone-${variant}`}>
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <div>
                  <strong><CountUp to={to} suffix={suffix} /></strong>
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="section-container">
          <div className="testimonials-header">
            <span className="section-eyebrow section-eyebrow-hidden">TESTIMONIALS</span>
            <h2 id="testimonials-heading" className="section-title section-title-md" data-reveal="words">
              <Words text="Trusted by" /><span className="text-accent"><Words text="forward-thinking" start={2} /></span><Words text="organizations" start={3} />
            </h2>
            <div className="carousel-controls" data-reveal="left" style={{ '--d': '300ms' }}>
              <button
                type="button"
                className="carousel-btn"
                aria-label="Previous testimonial"
                disabled={testimonialStart === 0}
                onClick={() => setTestimonialStart((n) => Math.max(0, n - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="carousel-btn carousel-btn-active"
                aria-label="Next testimonial"
                onClick={() => setTestimonialStart((n) => (n + 1) % testimonials.length)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((_, i) => {
              const t = testimonials[(testimonialStart + i) % testimonials.length];
              return (
                <figure key={t.name} className="testimonial-card" data-reveal="up" style={{ '--d': `${i * 130}ms` }}>
                  <Quote size={26} className="testimonial-quote" aria-hidden="true" />
                  <blockquote>{t.text}</blockquote>
                  <figcaption>
                    <span className="testimonial-avatar" aria-hidden="true">{t.initials}</span>
                    <span className="testimonial-person">
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </span>
                    <span className="testimonial-stars" aria-label="5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="cta-bg" aria-hidden="true">
          <img src="/images/cta-bg.jpg" alt="" loading="lazy" data-parallax />
        </div>
        <div className="section-container cta-inner">
          <span className="section-eyebrow" data-reveal="up">LET&apos;S BUILD TOGETHER</span>
          <h2 id="cta-heading" className="section-title section-title-md" data-reveal="words">
            <Words text="Ready to transform your business?" />
          </h2>
          <p className="section-lead" data-reveal="up" style={{ '--d': '300ms' }}>
            Partner with us to build innovative, scalable, and future-ready solutions
            that create real impact.
          </p>
          <div className="cta-actions" data-reveal="up" style={{ '--d': '450ms' }}>
            <a href="#contact" className="btn-primary">
              <span>Get Started</span>
              <ArrowRight size={14} />
            </a>
            <a href="#contact" className="btn-outline-pill btn-outline-lg">
              <span>Talk to Sales</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer" id="contact">
        <div className="section-container footer-grid">
          <div className="footer-brand" data-reveal="up">
            <a href="#home" aria-label="Aurevia">
              <img src="/images/aurevia-logo.png" alt="Aurevia" className="footer-logo" />
            </a>
            <p>
              Building innovative technology solutions that help businesses grow,
              adapt, and succeed in a digital world.
            </p>
            <div className="footer-socials">
              {socialLinks.map(({ label, path }) => (
                <a key={label} href="#contact" aria-label={label} className="social-link">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map(({ title, links }, i) => (
            <nav key={title} className="footer-col" aria-label={title} data-reveal="up" style={{ '--d': `${(i + 1) * 110}ms` }}>
              <h4>{title}</h4>
              <ul>
                {links.map((label) => (
                  <li key={label}><a href="#home">{label}</a></li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer-col footer-newsletter" data-reveal="up" style={{ '--d': '440ms' }}>
            <h4>Newsletter</h4>
            <p>Stay updated with our latest insights and news.</p>
            <form
              className="newsletter-form"
              onSubmit={(ev) => {
                ev.preventDefault();
                setEmail('');
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <button type="submit" aria-label="Subscribe">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        <div className="section-container footer-bottom" data-reveal="fade">
          <span>&copy; {new Date().getFullYear()} Aurevia. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Service</a>
            <a href="#home">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
