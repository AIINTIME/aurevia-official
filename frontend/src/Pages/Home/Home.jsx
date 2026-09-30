import React, { useState, useRef, useEffect } from 'react';
import {
  Sun,
  Moon,
  Rocket,
  Briefcase,
  CloudDownload,
  ArrowRight,
  Brain,
  CircleDollarSign,
  Diamond,
  Compass,
  LayoutGrid,
  Plus,
  TrendingUp,
} from 'lucide-react';
import './Home.css';

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
    iconType: 'rocket',
    badgeVariant: 'sky',
    title: 'Digital Transformation',
    description: 'Modernize your business with cutting-edge digital solutions.',
    linkText: 'Learn More',
    href: '#digital-transformation',
  },
  {
    id: 'it-consulting',
    iconType: 'briefcase',
    badgeVariant: 'green',
    title: 'IT Consulting',
    description: 'Expert guidance to optimize systems and drive efficiency.',
    linkText: 'Learn More',
    href: '#it-consulting',
  },
  {
    id: 'cloud-solutions',
    iconType: 'cloud',
    badgeVariant: 'purple',
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud solutions for the modern enterprise.',
    linkText: 'Learn More',
    href: '#cloud-solutions',
  },
  {
    id: 'data-analytics',
    iconType: 'analytics',
    badgeVariant: 'orange',
    title: 'Data & Analytics',
    description: 'Turn data into actionable insights and accelerate growth.',
    linkText: 'Learn More',
    href: '#data-analytics',
  },
];

const arcServicesList = [
  {
    id: 'business-planning',
    title: 'Business Planning',
    shortDesc: 'Our flagship business publication, Prysm Quarterly, has been defining and informing the senior management agenda since 1964.',
    highlightText: 'Prysm Quarterly',
    iconType: 'chart',
  },
  {
    id: 'financial-strategy',
    title: 'Financial Strategy',
    shortDesc: 'Custom algorithmic modeling and revenue optimization engines engineered to maximize enterprise capital efficiency and sustainable ROI.',
    highlightText: 'Capital Architecture',
    iconType: 'coins',
  },
  {
    id: 'creative-intelligence',
    title: 'Creative Intelligence',
    shortDesc: 'Generative AI workflows and proprietary model architectures customized for rapid brand scaling and automated design operations.',
    highlightText: 'Neural Intelligence',
    iconType: 'brain',
  },
  {
    id: 'value-engineering',
    title: 'Value Engineering',
    shortDesc: 'End-to-end modernization of legacy codebases, cloud infrastructure migration, and high-performance system optimization.',
    highlightText: 'Enterprise Modernization',
    iconType: 'diamond',
  },
  {
    id: 'strategic-consulting',
    title: 'Strategic Consulting',
    shortDesc: 'Executive technology advisory and technical due diligence delivering resilient architectural blueprints for high-growth tech ventures.',
    highlightText: 'Advisory Board',
    iconType: 'compass',
  },
  {
    id: 'digital-infrastructure',
    title: 'Digital Infrastructure',
    shortDesc: 'Ultra-low latency microservice fabrics and distributed cloud networks engineered for 99.999% high-availability enterprise scale.',
    highlightText: 'Cloud Fabric',
    iconType: 'grid',
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('aurevia_theme');
    return saved === 'dark';
  });
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('aurevia_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const navLinks = ['Home', 'About', 'Projects', 'Services', 'Blog', 'Contact'];

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

  const renderServiceIcon = (type) => {
    switch (type) {
      case 'rocket':
        return <Rocket size={24} strokeWidth={1.9} />;
      case 'briefcase':
        return <Briefcase size={24} strokeWidth={1.9} />;
      case 'cloud':
        return <CloudDownload size={24} strokeWidth={1.9} />;
      case 'analytics':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <path d="M17.5 6.5l-2.2 2.2M8.7 15.3l-2.2 2.2M6.5 6.5l2.2 2.2M15.3 15.3l2.2 2.2" />
          </svg>
        );
      default:
        return <Rocket size={24} strokeWidth={1.9} />;
    }
  };

  const renderArcNodeIcon = (type) => {
    switch (type) {
      case 'chart':
        return <TrendingUp size={22} strokeWidth={2} />;
      case 'coins':
        return <CircleDollarSign size={22} strokeWidth={2} />;
      case 'brain':
        return <Brain size={22} strokeWidth={2} />;
      case 'diamond':
        return <Diamond size={22} strokeWidth={2} />;
      case 'compass':
        return <Compass size={22} strokeWidth={2} />;
      case 'grid':
        return <LayoutGrid size={22} strokeWidth={2} />;
      default:
        return <TrendingUp size={22} strokeWidth={2} />;
    }
  };

  return (
    <div className={`home-container ${isDarkMode ? 'dark' : 'light'}`}>
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

        {/* Header / Navbar */}
        <header className="hero-header">
          <div className="header-inner">
            {/* Logo */}
            <a href="#home" className="brand-logo" aria-label="Aurevia">
              <img
                src="/images/aurevia-logo.png"
                alt="Aurevia"
                className="brand-logo-img"
              />
            </a>

            {/* Navigation Menu with Liquid Glassmorphism */}
            <nav className="nav-menu" aria-label="Main Navigation">
              {navLinks.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <a
                    key={tab}
                    href={`#${tab.toLowerCase()}`}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab);
                    }}
                  >
                    <span className="nav-link-text">{tab}</span>
                  </a>
                );
              })}
            </nav>

            {/* Header Action: Theme Toggler & Get in Touch */}
            <div className="header-cta">
              {/* Liquid Glass Theme Switcher */}
              <button
                className="theme-toggle-btn"
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
                title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
              >
                <div className="theme-toggle-track">
                  <span className="theme-toggle-thumb"></span>
                  <div className="theme-toggle-icons">
                    <Sun size={14} className="theme-icon-sun" />
                    <Moon size={14} className="theme-icon-moon" />
                  </div>
                </div>
              </button>

              <button className="btn-get-in-touch" type="button">
                Get in Touch
              </button>
            </div>
          </div>
        </header>

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

      {/* ── What We Do / Solutions Section (Just below Hero Section) ── */}
      <section className="services-section" id="services" aria-labelledby="services-heading">
        <div className="services-container">
          {/* Section Header Row */}
          <div className="services-header-row">
            <div className="services-header-left">
              <span className="services-eyebrow">WHAT WE DO</span>
              <h2 id="services-heading" className="services-main-title">
                <span className="services-title-line">Solutions that</span>
                <span className="services-title-line">
                  Drive <span className="services-title-accent">Real Impact</span>
                </span>
              </h2>
            </div>

            <div className="services-header-right">
              <p className="services-header-desc">
                From strategy to execution, we provide end-to-end<br className="desc-br" />
                services tailored to your business goals.
              </p>
              <a href="#services" className="services-explore-all-link">
                <span>Explore All Services</span>
                <ArrowRight size={16} className="explore-arrow-icon" />
              </a>
            </div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="services-cards-grid">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className={`service-card-item card-${service.badgeVariant}`}
              >
                <div className={`service-icon-box icon-${service.badgeVariant}`}>
                  {renderServiceIcon(service.iconType)}
                </div>

                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>

                <a href={service.href} className="service-card-link">
                  <span>{service.linkText}</span>
                  <ArrowRight size={15} className="card-link-arrow" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering Capacity / About Section (Just below What We Do) ── */}
      <section className="about-scale-section" id="about" aria-labelledby="about-scale-heading">
        {/* Background Decorative Fluid Waves & Halftone Dots */}
        <div className="about-bg-decoration" aria-hidden="true">
          <svg className="about-wave-svg" viewBox="0 0 540 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0062ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
              </linearGradient>
              <pattern id="dotPattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#0062ff" fillOpacity="0.25" />
              </pattern>
            </defs>
            {/* Halftone Dot Grid */}
            <circle cx="100" cy="250" r="110" fill="url(#dotPattern)" />
            {/* Fluid Cyan/Blue Curves */}
            <path d="M-60,210 C70,160 170,320 320,230 C420,170 480,250 540,290" stroke="url(#waveGrad1)" strokeWidth="2.5" fill="none" />
            <path d="M-60,230 C80,180 180,340 330,250 C430,190 490,270 550,310" stroke="url(#waveGrad1)" strokeWidth="2" fill="none" />
            <path d="M-60,250 C90,200 190,360 340,270 C440,210 500,290 560,330" stroke="url(#waveGrad1)" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
            <path d="M-60,270 C100,220 200,380 350,290 C450,230 510,310 570,350" stroke="url(#waveGrad1)" strokeWidth="1" fill="none" />
            <path d="M-60,180 C60,130 160,290 310,200 C410,140 470,220 530,260" stroke="url(#waveGrad1)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <div className="about-scale-container">
          {/* Left Column: Overlapping Images Collage */}
          <div className="about-visual-column">
            <div className="about-images-wrapper">
              {/* Primary Top Image */}
              <div className="about-image-card primary-image-card">
                <img
                  src="/images/about-team-1.jpg"
                  alt="Software Engineering Team Collaborating"
                  className="about-img-fluid"
                  loading="lazy"
                />
              </div>

              {/* Secondary Overlapping Bottom Image */}
              <div className="about-image-card secondary-image-card">
                <img
                  src="/images/about-team-2.jpg"
                  alt="Engineering Meeting and Discussion"
                  className="about-img-fluid"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Paragraph, and Highlights */}
          <div className="about-content-column">
            <h2 id="about-scale-heading" className="about-main-headline">
              We Help IT Companies Scale Engineering Capacity
            </h2>

            <p className="about-main-description">
              Dissuade ecstatic and properly saw entirely sir why laughter endeavor.
              In on my jointure horrible margaret suitable he followed speedily.
              Indeed vanity excuse or mr lovers of on. By offer scale an stuff.
              Blush be sorry no sight sang lose.
            </p>

            {/* Feature Rows */}
            <div className="about-feature-list">
              {/* Feature Item 1: Certified Company */}
              <div className="about-feature-item">
                <div className="about-feature-icon-wrapper">
                  <svg
                    className="about-feature-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="6" y1="7" x2="14" y2="7" />
                    <line x1="6" y1="11" x2="10" y2="11" />
                    <circle cx="16" cy="14" r="3" />
                    <path d="M16 11v6M14 16l2 2 2-2" />
                  </svg>
                </div>
                <div className="about-feature-text-block">
                  <h3 className="about-feature-title">Certified Company</h3>
                  <p className="about-feature-subtitle">
                    Assurance yet bed was improving furniture man. Distrusts delighted she listening.
                  </p>
                </div>
              </div>

              {/* Feature Item 2: Award Ceremony */}
              <div className="about-feature-item">
                <div className="about-feature-icon-wrapper">
                  <svg
                    className="about-feature-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 8c0 4.5 3 8 7 8s7-3.5 7-8" />
                    <path d="M3 6c0 3 1.5 5.5 3.5 7" />
                    <path d="M21 6c0 3-1.5 5.5-3.5 7" />
                    <polygon points="12 3 13.5 6.5 17 7 14.5 9.5 15 13 12 11.2 9 13 9.5 9.5 7 7 10.5 6.5 12 3" />
                  </svg>
                </div>
                <div className="about-feature-text-block">
                  <h3 className="about-feature-title">Award Ceremony</h3>
                  <p className="about-feature-subtitle">
                    Assurance yet bed was improving furniture man. Distrusts delighted she listening mrs extensive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Arc Services Section (Just below Scale Engineering Capacity) ── */}
      <section className="services-arc-section" id="best-services" aria-labelledby="arc-services-heading">
        {/* Background Skyline Silhouettes & Halftone Accents */}
        <div className="arc-bg-decorations" aria-hidden="true">
          {/* Top Left Halftone Dots */}
          <div className="arc-halftone-top-left"></div>

          {/* Top Right Halftone Dots */}
          <div className="arc-halftone-top-right"></div>

          {/* Panoramic Dubai Skyline Watermark */}
          <div className="arc-dubai-skyline-bg">
            <img
              src="/images/dubai-skyline-watermark.jpg"
              alt="Dubai Skyline Landmark Theme"
              className="arc-dubai-skyline-img"
              loading="lazy"
            />
          </div>
        </div>

        <div className="arc-section-container">
          {/* Top Center Header */}
          <div className="arc-header-block">
            <div className="arc-section-eyebrow">
              <span className="eyebrow-dash"></span>
              <span className="eyebrow-label">Our services</span>
              <span className="eyebrow-dash"></span>
            </div>

            <h2 id="arc-services-heading" className="arc-section-headline">
              Always we offer the best<br />services for success!
            </h2>

            <p className="arc-section-subdesc">
              New analytic tools can help manufacturers in labor-intensive sectors boost
              productivity and earnings by double-digit on It is a secure and simple
              ondemand. the total percentages.
            </p>
          </div>

          {/* Interactive Arc Wheel Display */}
          <div className="arc-interactive-stage">
            {/* SVG Curved Track Line */}
            <svg className="arc-track-svg" viewBox="0 0 760 420" fill="none" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="arcTrackGrad" x1="0%" y1="100%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0062ff" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#0062ff" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#0062ff" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              {/* Semi-circular Arc Line */}
              <path
                d="M 60,370 A 320,320 0 0,1 700,370"
                stroke="url(#arcTrackGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Floating 'More Services' Badge with cute pointer arrow */}
            <div className="arc-more-services-badge">
              <div className="more-services-btn-wrapper">
                <button className="more-services-circle-btn" type="button" aria-label="More Services">
                  <Plus size={18} strokeWidth={2.5} />
                </button>
                <span className="more-services-text">More Services &rarr;</span>
              </div>
              {/* Cute Curved Doodle Arrow pointing to button */}
              <svg className="more-services-doodle-arrow" viewBox="0 0 50 50" fill="none">
                <path
                  d="M10,40 C12,25 24,18 36,24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M32,18 L38,24 L30,27"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Circular Interactive Nodes positioned along the Arc */}
            <div className="arc-nodes-container">
              {arcServicesList.map((service, index) => {
                const isActive = activeServiceIndex === index;
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`arc-node-btn node-pos-${index} ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveServiceIndex(index)}
                    aria-label={`Select ${service.title}`}
                    title={service.title}
                  >
                    <span className="arc-node-icon">
                      {renderArcNodeIcon(service.iconType)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Central Active Service Card Display */}
            <div className="arc-center-card">
              <div className="center-card-icon-display">
                <div className="center-icon-screen">
                  <svg viewBox="0 0 64 64" fill="none" className="center-screen-svg">
                    <rect x="6" y="10" width="52" height="36" rx="6" fill="#e0f2fe" stroke="#0062ff" strokeWidth="2.5" />
                    <line x1="24" y1="52" x2="40" y2="52" stroke="#0062ff" strokeWidth="3" strokeLinecap="round" />
                    <line x1="32" y1="46" x2="32" y2="52" stroke="#0062ff" strokeWidth="3" />
                    {/* Rising Analytics Bars */}
                    <rect x="14" y="28" width="6" height="12" rx="1.5" fill="#0062ff" />
                    <rect x="24" y="22" width="6" height="18" rx="1.5" fill="#0284c7" />
                    <rect x="34" y="18" width="6" height="22" rx="1.5" fill="#38bdf8" />
                    <rect x="44" y="25" width="6" height="15" rx="1.5" fill="#0062ff" />
                    <path d="M14,24 L24,18 L34,14 L44,20" stroke="#0062ff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <h3 className="center-card-title">{arcServicesList[activeServiceIndex].title}</h3>

              {/* Blue accent underline bar */}
              <div className="center-card-divider"></div>

              <p className="center-card-desc">
                Our flagship business publication,{' '}
                <a href="#publications" className="center-card-highlight-link">
                  {arcServicesList[activeServiceIndex].highlightText}
                </a>
                , has been defining and informing the senior management agenda since 1964.
              </p>

              <button className="btn-arc-read-more" type="button">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
