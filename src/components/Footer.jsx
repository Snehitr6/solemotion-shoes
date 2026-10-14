import { ArrowUpRight, Zap } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" className="social-fill" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5c-.8-.2-1.8-.3-3-.3-3.2 0-5 1.9-5 5.3V9H7v4h3v8z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" className="social-fill" />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 3h4.5L20 21h-4.5z" />
        <path d="M20 3 5 21" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#home" className="brand" aria-label="SoleMotion home">
            <span className="brand-icon">
              <Zap size={21} fill="currentColor" />
            </span>

            <span>
              SOLE<span className="brand-light">MOTION</span>
            </span>
          </a>

          <p>Move with purpose. Make every step count.</p>

          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={`Visit ${social.name}`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <span className="footer-tagline">
            MADE FOR EVERYDAY MOVEMENT.
          </span>
        </div>

        <nav className="footer-column" aria-label="Explore">
          <h4>EXPLORE</h4>
          <a href="#collection">All sneakers</a>
          <a href="#collection">New arrivals</a>
          <a href="#collection">Best sellers</a>
        </nav>

        <nav className="footer-column" aria-label="SoleMotion information">
          <h4>SOLE MOTION</h4>
          <a href="#story">Our story</a>
          <a href="#benefits">Our promise</a>
          <a href="#reviews">Customer reviews</a>
        </nav>

        <div className="footer-newsletter">
          <span className="section-kicker">THE NEXT MOVE</span>
          <h3>
            Stay one step
            <br />
            ahead.
          </h3>
          <p>New drops, fresh ideas, and more reasons to move.</p>

          <a href="#collection" className="newsletter-link">
            Explore the collection
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SoleMotion. Demo storefront.</span>

        <span className="footer-bottom-center">
          DESIGNED FOR MOVEMENT <span className="accent-text">●</span>
        </span>

        <a href="#home" className="footer-back-top">
          BACK TO TOP <ArrowUpRight size={15} />
        </a>
      </div>
    </footer>
  );
}
