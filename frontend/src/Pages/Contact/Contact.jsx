import { useRef, useState } from 'react';
import {
  ArrowUp,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Briefcase,
  Send,
  CircleCheck,
  ChevronDown,
} from 'lucide-react';
import '../About/About.css';
import './Contact.css';
import Navbar from '../../components/Navbar';
import { Words } from '../../components/Reveal';
import { useScrollReveal } from '../../components/useReveal';
import { socialLinks } from '../../data/socialLinks';
import { worldMapPath, worldMapViewBox } from '../../data/worldMapDots';

const heroPoints = [
  { Icon: MessageSquare, text: ['Expert', 'Consultation'] },
  { Icon: Clock, text: ['24-Hour', 'Response Time'] },
  { Icon: Globe, text: ['Global', 'Support Team'] },
];

const inquiryAreas = ['AI & Intelligent Automation', 'SAP Consulting & Support', 'Business Intelligence & Analytics', 'Cloud Transformation', 'Careers', 'Other'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];

// Pin positions are lon/lat projected onto the same box as the dotted map
const pins = [
  { name: 'USA', side: 'left', region: 'North America', color: '#22c55e', style: { left: '20.6%', top: '29.7%' } },
  { name: 'UAE', side: 'left', region: 'Middle East', color: '#f59e0b', style: { left: '64.0%', top: '40.6%' } },
  { name: 'India', side: 'below', region: 'Asia', color: '#a855f7', style: { left: '70.9%', top: '42.0%' } },
  { name: 'Bangladesh', side: 'right', region: 'Asia', color: '#ef4444', style: { left: '74.3%', top: '40.6%' } },
];

const offices = [
  { flag: '🇮🇳', country: 'India', role: 'Global HQ', company: 'INTIME IT SERVICES PVT LTD', address: [<>3016-MIRAKUNJ, 3<sup>RD</sup> FLOOR,</>, 'RAJDANGA MAIN ROAD, KASBA,', 'KOLKATA-700107, WEST BENGAL'] },
  { flag: '🇦🇪', country: 'UAE (Dubai)', role: 'Middle East Hub', company: 'AUREVIATECH SOLUTIONS - FZCO', address: ['Premises No: DSO-DDP-A5-D-FLEX-G114,', 'Building Name: A5,', 'Area Name: Dubai Silicon Oasis'] },
  { flag: '🇧🇩', country: 'Bangladesh', role: 'Regional Office', company: 'INTIME IT SERVICES PVT LTD', address: ['57/16, East Rajabazar, West Panthapath,', 'Sher-E-Bangla Nagar,', 'Dhaka-1215, Bangladesh'] },
];

const socials = [
  { label: 'LinkedIn', text: 'Connect with our professionals and stay updated on our latest enterprise solutions.', color: '#0a66c2', index: 0 },
  { label: 'X (Twitter)', text: 'Follow us for real-time updates, news, and insights on AI, SAP, and BI technologies.', color: '#000', index: 1 },
  { label: 'YouTube', text: 'Watch our latest case studies, webinars, and product demonstrations.', color: '#ff0000', index: 2 },
  { label: 'Instagram', text: 'Behind the scenes, company culture, and latest news.', color: '#e1306c', index: 3 },
];

const footerColumns = [
  { title: 'What We Do', links: ['AI & Intelligent Automation', 'SAP Digital Core & Cloud', 'Business Intelligence & Analytics', 'Smart Application Development', 'Strategic Technology Talent', 'Enterprise Training & Upskilling'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Contact Us'] },
  { title: 'Legal & Support', links: ['Privacy Policy', 'Terms of Service'] },
];

const Field = ({ label, required, children }) => (
  <label className="ct-field">
    <span>{label}{required && <b> *</b>}</span>
    {children}
  </label>
);

const Contact = () => {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  const [isDark, setIsDark] = useState(() => localStorage.getItem('aurevia_theme') === 'dark');
  const toggleTheme = () => {
    setIsDark((prev) => {
      localStorage.setItem('aurevia_theme', prev ? 'light' : 'dark');
      return !prev;
    });
  };

  // Design only for now — the form is not wired to a backend yet
  const onSubmit = (e) => e.preventDefault();

  return (
    <div ref={rootRef} className={`about-page contact-page ${isDark ? 'dark' : 'light'}`}>
      {/* ── Hero ── */}
      <section className="ab-hero ct-hero">
        <Navbar page="contact" isDarkMode={isDark} onToggleTheme={toggleTheme} />
        <div className="ab-hero-media" aria-hidden="true">
          <img src="/images/contact-hero.png" alt="" />
        </div>
        <div className="ab-container ab-hero-inner">
          <div className="ab-hero-copy">
            <span className="ab-pill" data-reveal="up">CONTACT US</span>
            <h1 className="ab-hero-title" data-reveal="words">
              <Words text="Let's" /><br />
              <span className="ab-accent"><Words text="Connect" start={1} /></span>
            </h1>
            <p className="ab-hero-desc" data-reveal="up" style={{ '--d': '250ms' }}>
              Connect with our experts. Our team is ready to assist with your
              challenges and transform your enterprise with AI, SAP, and BI solutions.
            </p>
            <div className="ct-hero-points" data-reveal="up" style={{ '--d': '380ms' }}>
              {heroPoints.map(({ Icon, text }) => (
                <div key={text[0]} className="ct-hero-point">
                  <span className="ab-icon-chip"><Icon size={16} strokeWidth={1.8} /></span>
                  <span>{text[0]}<br />{text[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="ab-section ct-form-section ct-tint">
        <div className="ab-container ct-form-grid">
          <div className="ab-card ct-form-card" data-reveal="up">
            <span className="ab-pill">SEND A MESSAGE</span>
            <h2 className="ab-title ab-title-left">Send Your <span className="ab-accent">Message</span></h2>
            <p className="ct-lead">Fill out the form below and we&apos;ll get back to you within <strong>24 hours</strong>.</p>
            <p className="ct-note"><CircleCheck size={12} /> Principal consultant responds within 4 hours</p>

            <form className="ct-form" onSubmit={onSubmit}>
                <Field label="Full name" required><input required type="text" placeholder="Enter your full name" /></Field>
                <Field label="Business email" required><input required type="email" placeholder="name@company.com" /></Field>
                <Field label="Phone number" required>
                  <div className="ct-phone">
                    <span className="ct-code">🇮🇳 <b>+91</b> <ChevronDown size={11} /></span>
                    <input required type="tel" inputMode="numeric" pattern="[0-9]{10}" placeholder="10-digit number" />
                  </div>
                </Field>
                <Field label="Company name" required><input required type="text" placeholder="Your company name" /></Field>
                <Field label="Area of inquiry" required>
                  <select required defaultValue="">
                    <option value="" disabled>Select an option</option>
                    {inquiryAreas.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </Field>
                <Field label="Priority">
                  <select defaultValue="">
                    <option value="" disabled>Select priority</option>
                    {priorities.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <div className="ct-full">
                  <Field label="Your message" required>
                    <textarea required rows="4" placeholder="Describe your inquiry or requirement..." />
                  </Field>
                </div>
                <label className="ct-full ct-consent">
                  <input required type="checkbox" />
                  <span>I agree to the <a href="#/contact">Privacy Policy</a> and consent to InTime Global processing my personal data for the purpose of responding to my inquiry. <b>*</b></span>
                </label>
                <button type="submit" className="ab-btn-primary ct-submit ct-full"><Send size={14} /> Send Your Message</button>
              </form>
          </div>

          <aside className="ct-aside" data-reveal="zoom">
            <img src="/images/contact-office.png" alt="Modern office with city views" />
            <div className="ct-aside-copy">
              <h3>LET&apos;S BUILD<br />TOGETHER</h3>
              <p>From initial consultation to long-term partnership, we&apos;re here to help you achieve measurable impact.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Direct channels ── */}
      <section className="ab-section ct-plain">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">DIRECT CHANNELS</span>
            <h2 className="ab-title" data-reveal="up">Other Ways to <span className="ab-accent">Connect</span></h2>
            <p className="ab-sub" data-reveal="up">Choose the best way to connect with our specialized teams.</p>
          </header>
          <div className="ct-channels">
            <article className="ab-card ct-channel" data-reveal="up">
              <span className="ct-ch-icon ct-blue"><Phone size={22} /></span>
              <h3>Call Us</h3>
              <p>Speak directly with our consultants for immediate assistance.</p>
              <a className="ct-phone-line" href="tel:+919051615690"><Phone size={14} /> +91 905 161 5690</a>
              <a className="ct-phone-line" href="tel:+913335916556"><Phone size={14} /> +91 333 591 6556</a>
            </article>
            <article className="ab-card ct-channel" data-reveal="up" style={{ '--d': '120ms' }}>
              <span className="ct-ch-icon ct-green"><Mail size={22} /></span>
              <h3>Email Inquiries</h3>
              <p>For general questions and detailed project descriptions.</p>
              <a className="ct-pill ct-pill-green" href="mailto:enquiry@intimeinc.co.in">enquiry@intimeinc.co.in</a>
            </article>
            <article className="ab-card ct-channel" data-reveal="up" style={{ '--d': '240ms' }}>
              <span className="ct-ch-icon ct-purple"><Briefcase size={22} /></span>
              <h3>Careers</h3>
              <p>Interested in joining our team? Send us your resume.</p>
              <a className="ct-pill ct-pill-purple" href="mailto:careers@intimeinc.co.in">careers@intimeinc.co.in</a>
            </article>
          </div>
        </div>
      </section>

      {/* ── Global offices ── */}
      <section className="ab-section ct-tint">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">LOCATIONS</span>
            <h2 className="ab-title" data-reveal="up">Global <span className="ab-accent">Offices</span></h2>
            <p className="ab-sub" data-reveal="up">We&apos;re here to serve you across multiple continents.</p>
          </header>

          <div className="ct-map" data-reveal="up" role="img" aria-label="Global map of our offices">
            <svg viewBox={worldMapViewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path d={worldMapPath} fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
            {pins.map(({ name, region, color, side, style }) => (
              <div key={name} className={`ct-pin ct-pin-${side}`} style={style}>
                <MapPin size={20} fill={color} color={color} strokeWidth={1.5} />
                <span className="ct-pin-label"><b>{name}</b><small>{region}</small></span>
              </div>
            ))}
          </div>

          <div className="ct-offices">
            {offices.map(({ flag, country, role, company, address }, i) => (
              <article key={country} className="ab-card ct-office" data-reveal="up" style={{ '--d': `${i * 100}ms` }}>
                <span className="ct-flag" aria-hidden="true">{flag}</span>
                <h3>{country}</h3>
                <em>{role}</em>
                <strong>{company}</strong>
                {address.map((l, k) => <p key={k}>{l}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social ── */}
      <section className="ab-section ct-plain">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">FOLLOW US</span>
            <h2 className="ab-title" data-reveal="up">Connect on <span className="ab-accent">Social Media</span></h2>
            <p className="ab-sub" data-reveal="up">Follow us for the latest updates and insights.</p>
          </header>
          <div className="ct-socials">
            {socials.map(({ label, text, color, index }, i) => (
              <a key={label} href="#/contact" className="ab-card ct-social" data-reveal="up" style={{ '--d': `${i * 100}ms` }}>
                <span className="ct-social-icon" style={{ color }}>
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d={socialLinks[index].path} /></svg>
                </span>
                <h3>{label}</h3>
                <p>{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="ab-footer">
        <div className="ab-container ab-footer-grid">
          <div className="ab-footer-brand">
            <a href="#/" aria-label="Aurevia home"><img src="/images/aurevia-logo.png" alt="Aurevia" /></a>
            <p>Transforming enterprises through cutting-edge AI, SAP, and BI solutions.</p>
            <div className="ab-socials">
              {socialLinks.map(({ label, path }) => (
                <a key={label} href="#/contact" aria-label={label}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
                </a>
              ))}
            </div>
            <span className="ab-locations"><MapPin size={12} /> Locations</span>
            <p className="ct-foot-loc">India | UAE (Dubai) | Bangladesh</p>
          </div>
          {footerColumns.map(({ title, links }) => (
            <nav key={title} className="ab-footer-col" aria-label={title}>
              <h4>{title}</h4>
              <ul>{links.map((l) => <li key={l}><a href={l === 'About Us' ? '#/about' : '#/contact'}>{l}</a></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="ab-container ab-footer-bottom">
          <span>&copy; {new Date().getFullYear()} InTime Global. All rights reserved.</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to Top <ArrowUp size={12} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
