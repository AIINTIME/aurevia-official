import { useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  AudioLines,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  LayoutDashboard,
  Megaphone,
  Mic,
  MicOff,
  Pause,
  Phone,
  PhoneCall,
  PhoneOff,
  Play,
  Plane,
  Settings,
  ShoppingBag,
  Truck,
  LayoutGrid,
  Users,
  Workflow,
  MessageSquare,
  Sparkles,
  Send,
  Quote,
} from 'lucide-react';
import '../About/About.css';
import './VoiceAI.css';
import Navbar from '../../components/Navbar';
import { Words } from '../../components/Reveal';
import { useScrollReveal } from '../../components/useReveal';
import { socialLinks } from '../../data/socialLinks';

const Wave = ({ bars = 28, className = '', seed = 1 }) => (
  <span className={`vc-wave ${className}`} aria-hidden="true">
    {Array.from({ length: bars }, (_, i) => {
      const h = 22 + Math.abs(Math.sin((i + seed) * 1.7) * 60) + ((i * 7 + seed) % 5) * 3;
      return <i key={i} style={{ height: `${Math.min(h, 100)}%`, animationDelay: `${(i % 8) * 90}ms` }} />;
    })}
  </span>
);

const heroFeatures = [
  { Icon: Brain, text: 'Understands Context' },
  { Icon: BookOpen, text: 'Uses Your Knowledge Base' },
  { Icon: Globe, text: 'Speaks in Multiple Languages' },
  { Icon: Workflow, text: 'Takes Real Actions' },
];

const capabilities = [
  { Icon: PhoneCall, tone: 'blue', title: 'AI Calling Agent', text: 'Make and receive calls with natural, human-like conversations.', points: ['Handle customer queries', 'Qualify leads', 'Automate follow-ups'] },
  { Icon: Users, tone: 'green', title: 'Inbound & Outbound Calls', text: 'Manage both incoming and outgoing calls effortlessly.', points: ['24/7 call handling', 'Outbound campaigns', 'Smart call routing'] },
  { Icon: Brain, tone: 'purple', title: 'Second Brain', text: 'Give your AI a memory and knowledge base.', points: ['Company data & FAQs', 'CRM & database integration', 'Remembers past interactions'] },
  { Icon: AudioLines, tone: 'orange', title: 'Multiple Voice Models', text: 'Choose from realistic, expressive voices for your AI agent.', points: ['Male & female voices', 'Different accents & tones', 'Custom voice cloning'] },
];

const voices = [
  { name: 'Priya', photo: '/images/voices/ava.jpg', tag: 'Natural • Friendly', tone: '#f4c9b5', filters: ['Female', 'Friendly'] },
  { name: 'Arav', photo: '/images/voices/noah.jpg', tag: 'Professional • Deep', tone: '#c5cfdc', filters: ['Male', 'Professional'] },
  { name: 'Sofi', photo: '/images/voices/emma.jpg', tag: 'Calm • Warm', tone: '#e8c3a4', filters: ['Female', 'Premium'] },
  { name: 'Jeet', photo: '/images/voices/liam.jpg', tag: 'Energetic • Clear', tone: '#b9c6d6', filters: ['Male', 'Friendly', 'Premium'] },
];
const voiceFilters = ['All', 'Male', 'Female', 'Professional', 'Friendly', 'Premium'];

const languages = [
  { glyph: 'Aa', name: 'English', native: 'US • UK • IN accents', accent: 'blue' },
  { glyph: 'अ', name: 'Hindi', native: 'हिन्दी', accent: 'orange' },
  { glyph: 'অ', name: 'Bengali', native: 'বাংলা', accent: 'green' },
];

const steps = [
  { Icon: Settings, tone: 'blue', title: 'Configure', text: 'Set your agent, voice, and knowledge base' },
  { Icon: PhoneCall, tone: 'blue', title: 'Deploy', text: 'Launch for inbound and/or outbound calls' },
  { Icon: MessageSquare, tone: 'purple', title: 'Engage', text: 'AI handles conversations naturally' },
  { Icon: CheckCircle2, tone: 'green', title: 'Take Action', text: 'Book meetings, update CRM, send follow-ups and more' },
];

const sidebar = [
  [LayoutDashboard, 'Dashboard'], [Phone, 'Call Logs'], [Users, 'Contacts'], [Megaphone, 'Campaigns'],
  [BookOpen, 'Knowledge Base'], [AudioLines, 'Voice Models'], [BarChart3, 'Analytics'], [Settings, 'Settings'],
];

const industries = [
  { Icon: ShoppingBag, color: '#ef4444', label: 'E-commerce' },
  { Icon: Heart, color: '#ef4444', label: 'Healthcare' },
  { Icon: Building2, color: '#3b82f6', label: 'Real Estate' },
  { Icon: GraduationCap, color: '#2563eb', label: 'Education' },
  { Icon: Landmark, color: '#2563eb', label: 'Finance' },
  { Icon: Plane, color: '#2563eb', label: 'Travel & Hospitality' },
  { Icon: Truck, color: '#8b5cf6', label: 'Logistics' },
  { Icon: LayoutGrid, color: '#8b5cf6', label: 'And More' },
];

const testimonials = [
  { text: 'Aurevia’s voice agents handle thousands of customer calls every day with incredible accuracy. It feels like talking to a real person.', name: 'Rohan Mehta', role: 'CTO, RetailTech', ini: 'RM' },
  { text: 'The multi-language support and natural voices have helped us expand to new markets effortlessly.', name: 'Sneha Kapoor', role: 'Head of Customer Success, HealthWave', ini: 'SK' },
  { text: 'The second brain feature is a game changer. Our AI agents understand our products and give accurate, contextual answers.', name: 'Arjun Nair', role: 'Founder, EduNext', ini: 'AN' },
];

const footerCols = [
  { title: 'Product', links: ['Features', 'Use Cases', 'Pricing', 'Integrations'] },
  { title: 'Resources', links: ['Blog', 'Docs', 'Case Studies', 'Support'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Contact Us', 'Partners'] },
];

const Avatar = ({ ini, tone = '#c9d8f0', size = 40 }) => (
  <span className="vc-avatar" style={{ width: size, height: size, background: tone, fontSize: size * 0.36 }}>{ini}</span>
);

const VoiceAI = () => {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  const [isDark, setIsDark] = useState(() => localStorage.getItem('aurevia_theme') === 'dark');
  const [filter, setFilter] = useState('All');
  const [testi, setTesti] = useState(0);
  const [playing, setPlaying] = useState(null);
  const toggleTheme = () => {
    setIsDark((prev) => {
      localStorage.setItem('aurevia_theme', prev ? 'light' : 'dark');
      return !prev;
    });
  };

  const shownVoices = voices.filter((v) => filter === 'All' || v.filters.includes(filter));
  const go = (d) => setTesti((i) => (i + d + testimonials.length) % testimonials.length);

  return (
    <div ref={rootRef} className={`about-page voice-page ${isDark ? 'dark' : 'light'}`}>
      {/* ── Hero ── */}
      <section className="ab-hero vc-hero">
        <Navbar page="products" isDarkMode={isDark} onToggleTheme={toggleTheme} />
        <div className="ab-container vc-hero-grid">
          <div className="vc-hero-copy">
            <span className="ab-pill" data-reveal="up">VOICE AI PLATFORM</span>
            <h1 className="ab-hero-title" data-reveal="words">
              <Words text="Human-Like" /><br />
              <span className="ab-accent"><Words text="Voice AI Agents" start={1} /></span><br />
              <Words text="for Real Business Impact" start={4} />
            </h1>
            <p className="ab-hero-desc" data-reveal="up" style={{ '--d': '250ms' }}>
              Aurevia Voice AI agents call, answer, understand and take action — for
              inbound and outbound conversations, in any language, with a built-in second brain.
            </p>
            <div className="ab-hero-actions" data-reveal="up" style={{ '--d': '380ms' }}>
              <a href="#/contact" className="ab-btn-primary"><span>Book a Demo</span><ArrowRight size={14} /></a>
              <a href="#/contact" className="ab-btn-light">Start Free Trial</a>
            </div>
            <ul className="vc-checks" data-reveal="up" style={{ '--d': '480ms' }}>
              {['No credit card required', 'Quick setup', 'Enterprise ready'].map((t) => (
                <li key={t}><CircleCheck size={15} /> {t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="vc-hero-media" aria-hidden="true">
          <div className="vc-hero-art">
            <img src="/images/voice-hero.jpg" alt="" className="vc-hero-img" />
            <span className="vc-sheen" />
            <span className="vc-mic-pulse"><i /><i /><i /></span>
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className="vc-spark" style={{ left: `${8 + ((i * 37) % 84)}%`, top: `${20 + ((i * 53) % 70)}%`, animationDelay: `${i * 0.55}s`, animationDuration: `${5 + (i % 4)}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Key capabilities ── */}
      <section className="ab-section vc-plain">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">KEY CAPABILITIES</span>
            <h2 className="ab-title" data-reveal="words">
              <Words text="Everything You Need for" /><br />
              <span className="ab-accent"><Words text="Intelligent" start={4} /></span> <Words text="Voice Operations" start={5} />
            </h2>
            <p className="ab-sub" data-reveal="up" style={{ '--d': '250ms' }}>
              Build, deploy and scale voice AI agents that sound human, work 24/7,
              and drive real business outcomes.
            </p>
          </header>
          <div className="vc-cap-grid">
            {capabilities.map(({ Icon, tone, title, text, points }, i) => (
              <article key={title} className="ab-card vc-cap" data-reveal="up" style={{ '--d': `${i * 100}ms` }}>
                <span className={`vc-tile vc-tile-${tone}`}><Icon size={20} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>{points.map((pt) => <li key={pt}><CircleCheck size={14} /> {pt}</li>)}</ul>
              </article>
            ))}
          </div>

          {/* voices + languages */}
          <div className="vc-duo">
            <div className="ab-card vc-panel vc-voices" data-reveal="up">
              <div className="vc-panel-head">
                <span className="vc-tile vc-tile-blue"><Mic size={20} /></span>
                <div><h3>Realistic Voice Models</h3><p>Choose from a library of ultra-realistic AI voices.</p></div>
              </div>
              <div className="vc-filters" role="tablist">
                {voiceFilters.map((f) => (
                  <button key={f} type="button" role="tab" aria-selected={filter === f}
                    className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
                ))}
              </div>
              <div className="vc-voice-row">
                {shownVoices.map(({ name, tag, tone, photo }) => (
                  <div key={name} className="vc-voice">
                    <span className="vc-voice-photo" style={{ background: tone }}>
                      <span>{name[0]}</span>
                      <img src={photo} alt={`${name} voice`} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <button type="button" aria-label={`Play ${name}`} onClick={() => setPlaying(playing === name ? null : name)}>
                        {playing === name ? <Pause size={11} /> : <Play size={11} fill="currentColor" />}
                      </button>
                    </span>
                    <b>{name}</b>
                    <small>{tag}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="ab-card vc-panel vc-langs" data-reveal="up" style={{ '--d': '120ms' }}>
              <div className="vc-panel-head">
                <span className="vc-tile vc-tile-blue"><Globe size={20} /></span>
                <div><h3>Speak in Multiple Languages</h3><p>Deploy voice agents that speak naturally in English, Hindi and Bengali, with more languages on the way.</p></div>
              </div>
              <div className="vc-lang-grid">
                {languages.map(({ glyph, name, native, accent }, i) => (
                  <div key={name} className={`vc-lang vc-lang-${accent}`} style={{ '--i': i }}>
                    <span className="vc-lang-glyph">{glyph}</span>
                    <b>{name}</b>
                    <small>{native}</small>
                    <Wave bars={12} className="vc-wave-sm vc-lang-wave" seed={i * 5 + 2} />
                    <em><i /> Available</em>
                  </div>
                ))}
              </div>
              <div className="vc-lang-soon">
                <Sparkles size={16} />
                <span>Many more languages coming soon</span>
                <i className="vc-dots-anim" aria-hidden="true"><b /><b /><b /></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="ab-section vc-tint vc-how">
        <div className="ab-container vc-how-grid">
          <div data-reveal="up">
            <span className="ab-pill">SIMPLE SETUP, POWERFUL RESULTS</span>
            <h2 className="ab-title ab-title-left">How It Works</h2>
            <p className="ab-sub" style={{ marginTop: 14 }}>
              Set up your AI voice agent in minutes and start handling calls at scale.
            </p>
          </div>
          <div className="vc-steps">
            {steps.map(({ Icon, tone, title, text }, i) => (
              <div key={title} className="vc-step" data-reveal="up" style={{ '--d': `${i * 120}ms` }}>
                <span className={`vc-step-icon vc-tile-${tone}`}><Icon size={22} /></span>
                <b><em>0{i + 1}</em> {title}</b>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard + use cases ── */}
      <section className="ab-section vc-plain">
        <div className="ab-container vc-dash-grid">
          <div className="vc-dashboard" data-reveal="up">
            <aside className="vc-side">
              <span className="vc-side-logo"><img src="/images/aurevia-logo.png" alt="Aurevia" /></span>
              {sidebar.map(([Icon, label], i) => (
                <span key={label} className={i === 0 ? 'active' : ''}><Icon size={13} /> {label}</span>
              ))}
            </aside>
            <div className="vc-dash-main">
              <div className="vc-active">
                <h4>Active Calls</h4>
                <div className="vc-active-top"><span className="vc-live-pill"><i /> Live</span><span className="vc-timer">00:24</span></div>
                <div className="vc-active-card">
                  <div className="vc-customer">
                    <Avatar ini="PS" tone="#e5d3c0" size={38} />
                    <div><b>Priya Sharma</b><small>+91 98765 43210</small></div>
                  </div>
                  <Wave bars={30} seed={11} />
                  <div className="vc-controls">
                    <button type="button" aria-label="Mute"><MicOff size={13} /></button>
                    <button type="button" aria-label="Pause"><Pause size={13} /></button>
                    <button type="button" className="vc-end" aria-label="End call"><PhoneOff size={14} /></button>
                  </div>
                </div>
              </div>
              <div className="vc-transcript">
                <div className="vc-tabs"><span className="active">Transcript</span><span>AI Insights</span></div>
                {[
                  ['AI Agent', '00:05', 'Hello! This is Aurevia. How can I help you today?', false],
                  ['Customer', '00:12', 'I’d like to know more about your services.', true],
                  ['AI Agent', '00:18', 'Sure! I’d be happy to help. Let me share the details...', false],
                ].map(([who, t, msg, cust]) => (
                  <div key={t} className={`vc-msg ${cust ? 'cust' : ''}`}>
                    <b>{who} <small>{t}</small></b>
                    <p>{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ab-card vc-usecases" data-reveal="up" style={{ '--d': '120ms' }}>
            <span className="vc-chip-tag">USE CASES</span>
            <h3>Built for Every <span className="ab-accent">Industry</span></h3>
            <p>From startups to enterprises, our Voice AI agents work across multiple industries.</p>
            <div className="vc-ind-grid">
              {industries.map(({ Icon, color, label }) => (
                <span key={label} className="vc-ind"><Icon size={22} style={{ color }} />{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="ab-section vc-tint">
        <div className="ab-container">
          <header className="ab-section-head">
            <span className="ab-pill" data-reveal="up">TRUSTED BY BUSINESSES</span>
            <h2 className="ab-title" data-reveal="up">Real Conversations. Real Results.</h2>
            <p className="ab-sub" data-reveal="up">See how companies are using Aurevia Voice AI to improve customer experience and drive growth.</p>
          </header>
          <div className="vc-testi">
            <button type="button" className="vc-arrow" aria-label="Previous" onClick={() => go(-1)}><ChevronLeft size={16} /></button>
            <div className="vc-testi-grid">
              {testimonials.map(({ text, name, role, ini }, i) => (
                <article key={name} className={`ab-card vc-quote ${i === testi ? 'is-on' : ''}`} data-reveal="up" style={{ '--d': `${i * 100}ms` }}>
                  <Quote size={20} className="vc-q" fill="currentColor" />
                  <p>{text}</p>
                  <div className="vc-customer"><Avatar ini={ini} tone="#cfe0fb" size={38} /><div><b>{name}</b><small>{role}</small></div></div>
                </article>
              ))}
            </div>
            <button type="button" className="vc-arrow" aria-label="Next" onClick={() => go(1)}><ChevronRight size={16} /></button>
          </div>
          <div className="vc-dots">
            {testimonials.map((t, i) => (
              <button key={t.name} type="button" aria-label={`Testimonial ${i + 1}`} className={i === testi ? 'on' : ''} onClick={() => setTesti(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="vc-cta">
        <div className="ab-container vc-cta-inner">
          <span className="vc-cta-badge vc-cta-badge-l"><Phone size={26} /></span>
          <div className="vc-cta-copy" data-reveal="up">
            <span className="ab-pill">READY TO TRANSFORM YOUR CUSTOMER CONVERSATIONS?</span>
            <h2 className="ab-title">Start with <span className="ab-accent">Aurevia Voice AI</span> Today</h2>
            <p className="ab-sub">Automate calls, improve efficiency, and use AI to improve customer experience and drive growth.</p>
            <div className="vc-cta-actions">
              <a href="#/contact" className="ab-btn-primary"><span>Book a Demo</span><ArrowRight size={14} /></a>
              <a href="#/contact" className="ab-btn-light">Start Free Trial</a>
            </div>
            <ul className="vc-checks vc-checks-center">
              {['No credit card required', '14-day free trial', 'Setup in minutes'].map((t) => (
                <li key={t}><CircleCheck size={15} /> {t}</li>
              ))}
            </ul>
          </div>
          <span className="vc-cta-badge vc-cta-badge-r"><AudioLines size={26} /></span>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="ab-footer">
        <div className="ab-container vc-footer-grid">
          <div className="ab-footer-brand">
            <a href="#/" aria-label="Aurevia home"><img src="/images/aurevia-logo.png" alt="Aurevia" /></a>
            <p>Voice AI agents that help businesses connect, automate, and grow.</p>
            <div className="ab-socials">
              {[0, 1, 2].map((i) => (
                <a key={socialLinks[i].label} href="#/products/voice-ai" aria-label={socialLinks[i].label}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d={socialLinks[i].path} /></svg>
                </a>
              ))}
            </div>
          </div>
          {footerCols.map(({ title, links }) => (
            <nav key={title} className="ab-footer-col" aria-label={title}>
              <h4>{title}</h4>
              <ul>{links.map((l) => <li key={l}><a href={l === 'About Us' ? '#/about' : l === 'Contact Us' ? '#/contact' : '#/products/voice-ai'}>{l}</a></li>)}</ul>
            </nav>
          ))}
          <div className="ab-footer-col vc-news">
            <h4>Subscribe to our newsletter</h4>
            <p>Get the latest updates and insights.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" aria-label="Email" />
              <button type="submit" aria-label="Subscribe"><Send size={14} /></button>
            </form>
          </div>
        </div>
        <div className="ab-container ab-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Aurevia. All rights reserved.</span>
          <span className="vc-legal"><a href="#/">Privacy Policy</a><a href="#/">Terms of Service</a><a href="#/">Security</a></span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VoiceAI;
