import { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";

export default function Navbar({
  cartCount = 0,
  onOpenCart = () => {},
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleCartClick() {
    closeMenu();
    onOpenCart();
  }

  return (
    <header className={`navbar ${menuOpen ? "menu-is-open" : ""}`}>
      <a href="#home" className="brand" onClick={closeMenu}>
        <span className="brand-icon">
          <Zap size={21} fill="currentColor" />
        </span>

        <span>
          SOLE<span className="brand-light">MOTION</span>
        </span>
      </a>

      <nav
        className={`nav-links ${menuOpen ? "nav-open" : ""}`}
        aria-label="Main navigation"
      >
        <a href="#home" onClick={closeMenu}>
          Home
        </a>

        <a href="#collection" onClick={closeMenu}>
          Collection
        </a>

        <a href="#story" onClick={closeMenu}>
          Our story
        </a>

        <a href="#benefits" onClick={closeMenu}>
          Why us
        </a>

        <button
          type="button"
          className="mobile-cart-link"
          onClick={handleCartClick}
        >
          <ShoppingBag size={18} />
          Your bag ({cartCount})
        </button>
      </nav>

      <div className="nav-actions">
        <button
          type="button"
          className="cart-button"
          onClick={handleCartClick}
          aria-label={`Open shopping cart, ${cartCount} items`}
        >
          <ShoppingBag size={20} />
          <span>Bag</span>
          <span className="cart-count">{cartCount}</span>
        </button>

        <a
          className="nav-cta"
          href="#collection"
          onClick={closeMenu}
        >
          Shop now <ArrowUpRight size={17} />
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}