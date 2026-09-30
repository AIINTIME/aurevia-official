import { Sun, Moon, ChevronDown } from 'lucide-react';
import './Navbar.css';

const links = (page) => [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#/about' },
  {
    label: 'Products',
    href: '#/products',
    children: [
      { label: 'Boss AI', href: '#/products/boss-ai' },
      { label: 'Voice AI', href: '#/products/voice-ai' },
    ],
  },
  { label: 'Services', href: page === 'home' ? '#services' : '#/' },
  { label: 'Contact', href: '#/contact' },
];

// `page` is 'home' | 'about' and decides which nav item is highlighted
const Navbar = ({ page, isDarkMode, onToggleTheme }) => (
  <header className="hero-header">
    <div className="header-inner">
      <a href="#/" className="brand-logo" aria-label="Aurevia">
        <img src="/images/aurevia-logo.png" alt="Aurevia" className="brand-logo-img" />
      </a>

      <nav className="nav-menu" aria-label="Main Navigation">
        {links(page).map(({ label, href, children }) => {
          const link = (
            <a
              key={label}
              href={href}
              className={`nav-link ${label.toLowerCase() === page ? 'active' : ''}`}
            >
              <span className="nav-link-text">{label}</span>
              {children && <ChevronDown size={13} className="nav-caret" />}
            </a>
          );
          if (!children) return link;
          return (
            <div key={label} className="nav-item has-dropdown">
              {link}
              <div className="nav-dropdown">
                {children.map((c) => (
                  <a key={c.label} href={c.href} className="nav-dropdown-link">{c.label}</a>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="header-cta">
        <button
          className="theme-toggle-btn"
          type="button"
          onClick={onToggleTheme}
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

        <a href="#/contact" className="btn-get-in-touch">
          Get in Touch
        </a>
      </div>
    </div>
  </header>
);

export default Navbar;
