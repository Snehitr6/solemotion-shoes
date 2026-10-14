
import {useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Truck,
  X,
} from "lucide-react";
import { products, formatPrice } from "./data/products";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";

const categories = ["All Shoes", "Running", "Lifestyle", "Training"];
const allSizes = [6, 7, 8, 9, 10, 11, 12];

function BrandLogo() {
  return (
    <a href="#home" className="brand-logo" aria-label="SoleMotion home">
      <span className="brand-mark" aria-hidden="true">
        <svg
          viewBox="0 0 48 48"
          width="42"
          height="42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="14" fill="#172B25" />
          <path
            d="M10 29.5C15 28 17 24 19 18.5L22 13L27 23L35 27C38 28.5 39 31 37 33.5C35.5 35 33 35.5 29 35.5H15C11 35.5 9 33 10 29.5Z"
            fill="#F7F5ED"
          />
          <path
            d="M12 31.5C18 33 28 33.5 36 30"
            stroke="#C6A875"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M19 25L26 27"
            stroke="#172B25"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="brand-word">
        SOLE<span>MOTION</span>
      </span>
    </a>
  );
}

function ProductCard({ product, favorite, onFavorite, onQuickView, onAdd }) {
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && (
          <span className={`product-badge ${product.badge === "SALE" ? "sale-badge" : ""}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`favorite-btn ${favorite ? "is-favorite" : ""}`}
          onClick={() => onFavorite(product.id)}
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>

        <button
          className="product-image-button"
          onClick={() => onQuickView(product)}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80";
            }}
          />
        </button>

        <button className="quick-add" onClick={() => onQuickView(product)}>
          <span>Choose size</span>
          <Plus size={17} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-category-line">
          <span>{product.category}</span>
          <span className="rating">
            <Star size={13} fill="currentColor" />
            {product.rating}
          </span>
        </div>

        <button className="product-name" onClick={() => onQuickView(product)}>
          {product.name}
        </button>

        <p className="product-color">{product.color}</p>

        <div className="product-price-line">
          <strong>{formatPrice(product.price)}</strong>
          <del>{formatPrice(product.oldPrice)}</del>
          <span className="discount">{discount}% off</span>
        </div>
      </div>
    </article>
  );
}

function QuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState(null);
  const [message, setMessage] = useState("");

  if (!product) return null;

  return (
    <div className="overlay modal-overlay" onMouseDown={onClose}>
      <section
        className="quick-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close icon-btn" onClick={onClose} aria-label="Close">
          <X size={21} />
        </button>

        <div className="quick-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="quick-details">
          <span className="eyebrow">{product.category} COLLECTION</span>
          <h2>{product.name}</h2>
          <p className="quick-color">{product.color}</p>

          <div className="quick-rating">
            <Star size={15} fill="currentColor" />
            <strong>{product.rating}</strong>
            <span>{product.reviews} reviews</span>
          </div>

          <div className="quick-price">
            <strong>{formatPrice(product.price)}</strong>
            <del>{formatPrice(product.oldPrice)}</del>
          </div>

          <div className="size-heading">
            <strong>Select size (UK)</strong>
            <span>Choose your fit</span>
          </div>

          <div className="size-grid">
            {product.sizes.map((shoeSize) => (
              <button
                key={shoeSize}
                className={size === shoeSize ? "selected" : ""}
                onClick={() => {
                  setSize(shoeSize);
                  setMessage("");
                }}
              >
                {shoeSize}
              </button>
            ))}
          </div>

          {message && <p className="size-message">{message}</p>}

          <button
            className="dark-button modal-add"
            onClick={() => {
              if (!size) {
                setMessage("Please select a shoe size first.");
                return;
              }
              onAdd(product, size);
              onClose();
            }}
          >
            Add to bag <ShoppingBag size={18} />
          </button>

          <div className="quick-perks">
            <span><Truck size={16} /> Free shipping over ₹2,999</span>
            <span><RotateCcw size={16} /> Easy returns policy</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function CartDrawer({ cart, onClose, onUpdate, onRemove, onCheckout }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="overlay" onMouseDown={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="drawer-heading">
          <div>
            <span className="eyebrow">YOUR SELECTION</span>
            <h2>Your bag <span>({count})</span></h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close bag">
            <X size={21} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon"><ShoppingBag size={30} /></div>
            <h3>Your bag is taking a breather.</h3>
            <p>Find your next favorite pair and add it here.</p>
            <button className="dark-button" onClick={onClose}>
              Explore shoes <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.key}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-title">
                      <h3>{item.name}</h3>
                      <button
                        className="remove-btn"
                        onClick={() => onRemove(item.key)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <p>{item.color} · UK {item.size}</p>
                    <strong>{formatPrice(item.price)}</strong>

                    <div className="quantity-control">
                      <button
                        onClick={() => onUpdate(item.key, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdate(item.key, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-bottom">
              <div className="shipping-note">
                <Truck size={17} />
                <span>Complimentary shipping on this order</span>
              </div>
              <div className="subtotal-line">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="tax-note">
                Final amount shown at checkout. This is a demonstration store.
              </p>
              <button className="dark-button checkout-button" onClick={onCheckout}>
                Proceed to checkout <ArrowUpRight size={18} />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function CheckoutModal({ cart, onClose, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "upi",
    upiId: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function changeField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function submitCheckout(event) {
    event.preventDefault();
    if (processing) return;

    if (!cart.length) {
      setError("Your bag is empty. Add a shoe before checking out.");
      return;
    }

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.pincode.trim()
    ) {
      setError("Please complete all delivery details.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ""))) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pincode)) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }

    if (form.payment === "upi" && !/^[\w.-]+@[\w.-]+$/.test(form.upiId)) {
      setError("Enter a demo UPI ID, for example name@upi.");
      return;
    }

    if (form.payment === "card") {
      const digits = form.cardNumber.replace(/\s/g, "");
      if (
        form.cardName.trim().length < 2 ||
        digits.length !== 16 ||
        !/^\d{2}\/\d{2}$/.test(form.expiry) ||
        !/^\d{3,4}$/.test(form.cvv)
      ) {
        setError("Complete the demo card fields using fictional details.");
        return;
      }
    }

    setProcessing(true);
    setError("");

    // Simulated payment only. This does not charge money.
    window.setTimeout(() => {
      onPlaceOrder({
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          pincode: form.pincode.trim(),
        },
        paymentMethod: form.payment,
        paymentStatus:
          form.payment === "cod"
            ? "Payment due on delivery"
            : "Demo payment successful",
        total,
        items: cart.map((item) => ({ ...item })),
      });
    }, 1000);
  }

  return (
    <div className="overlay checkout-overlay" onMouseDown={onClose}>
      <section
        className="checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="checkout-header">
          <div>
            <span className="eyebrow">SOLEMOTION / CHECKOUT</span>
            <h2>Almost <em>yours.</em></h2>
            <p>Confirm your details and complete your order.</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close checkout">
            <X size={21} />
          </button>
        </div>

        <form className="checkout-form" onSubmit={submitCheckout}>
          <div className="checkout-section-heading">
            <span>01</span><h3>Delivery details</h3>
          </div>

          <div className="checkout-fields">
            <label>
              Full name
              <input name="name" value={form.name} onChange={changeField} placeholder="Your full name" autoComplete="name" required />
            </label>
            <label>
              Email address
              <input name="email" type="email" value={form.email} onChange={changeField} placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label>
              Phone number
              <input name="phone" inputMode="numeric" maxLength={10} value={form.phone} onChange={changeField} placeholder="10-digit mobile number" autoComplete="tel" required />
            </label>
            <label className="checkout-full-field">
              Street address
              <textarea name="address" rows={2} value={form.address} onChange={changeField} placeholder="House number, street, area" autoComplete="street-address" required />
            </label>
            <label>
              City
              <input name="city" value={form.city} onChange={changeField} placeholder="Your city" autoComplete="address-level2" required />
            </label>
            <label>
              PIN code
              <input name="pincode" inputMode="numeric" maxLength={6} value={form.pincode} onChange={changeField} placeholder="6-digit PIN code" autoComplete="postal-code" required />
            </label>
          </div>

          <div className="checkout-section-heading payment-heading">
            <span>02</span><h3>Payment method</h3>
          </div>

          <div className="payment-options">
            {[
              { value: "upi", title: "UPI", description: "Demo UPI checkout" },
              { value: "card", title: "Card", description: "Demo card checkout" },
              { value: "cod", title: "Cash on delivery", description: "Pay on delivery" },
            ].map((option) => (
              <button
                type="button"
                key={option.value}
                className={`payment-option ${form.payment === option.value ? "active" : ""}`}
                onClick={() => {
                  setForm((current) => ({ ...current, payment: option.value }));
                  setError("");
                }}
              >
                <span className="payment-radio">
                  {form.payment === option.value && <span />}
                </span>
                <span>
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </span>
              </button>
            ))}
          </div>

          {form.payment === "upi" && (
            <label className="payment-detail-field">
              Demo UPI ID
              <input name="upiId" value={form.upiId} onChange={changeField} placeholder="name@upi" autoComplete="off" required />
              <small>No real UPI request will be sent.</small>
            </label>
          )}

          {form.payment === "card" && (
            <div className="checkout-fields card-fields">
              <label className="checkout-full-field">
                Name on card
                <input name="cardName" value={form.cardName} onChange={changeField} placeholder="Name on card" autoComplete="off" required />
              </label>
              <label className="checkout-full-field">
                Card number
                <input
                  name="cardNumber"
                  inputMode="numeric"
                  maxLength={19}
                  value={form.cardNumber}
                  onChange={(event) => {
                    const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
                    setForm((current) => ({
                      ...current,
                      cardNumber: digits.replace(/(.{4})/g, "$1 ").trim(),
                    }));
                    setError("");
                  }}
                  placeholder="1234 5678 9012 3456"
                  autoComplete="off"
                  required
                />
              </label>
              <label>
                Expiry
                <input
                  name="expiry"
                  maxLength={5}
                  value={form.expiry}
                  onChange={(event) => {
                    let value = event.target.value.replace(/\D/g, "").slice(0, 4);
                    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
                    setForm((current) => ({ ...current, expiry: value }));
                    setError("");
                  }}
                  placeholder="MM/YY"
                  autoComplete="off"
                  required
                />
              </label>
              <label>
                CVV
                <input
                  name="cvv"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={form.cvv}
                  onChange={(event) => {
                    setForm((current) => ({
                      ...current,
                      cvv: event.target.value.replace(/\D/g, "").slice(0, 4),
                    }));
                    setError("");
                  }}
                  placeholder="123"
                  autoComplete="off"
                  required
                />
              </label>
              <p className="checkout-security-note checkout-full-field">
                Demo only. Never enter real payment credentials here.
              </p>
            </div>
          )}

          <div className="checkout-summary">
            <div><span>Items</span><span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
            <div><span>Shipping</span><span>FREE</span></div>
            <div className="checkout-total"><strong>Total</strong><strong>{formatPrice(total)}</strong></div>
          </div>

          {error && <p className="checkout-error" role="alert">{error}</p>}

          <button className="dark-button checkout-submit" type="submit" disabled={processing}>
            {processing ? (
              <>Processing demo payment… <span className="loading-dot" /></>
            ) : (
              <>Confirm order · {formatPrice(total)} <ShieldCheck size={18} /></>
            )}
          </button>
          <p className="checkout-disclaimer">
            Demo only — no real payment will be taken.
          </p>
        </form>
      </section>
    </div>
  );
}

function OrderSuccess({ order, onContinueShopping }) {
  return (
    <div className="success-page">
      <header className="success-topbar">
        <BrandLogo />
        <span><ShieldCheck size={15} /> ORDER CONFIRMATION</span>
      </header>

      <main className="success-content">
        <div className="success-check"><Check size={38} strokeWidth={2.5} /></div>
        <span className="eyebrow success-eyebrow">
          {order.paymentMethod === "cod" ? "ORDER PLACED" : "DEMO PAYMENT COMPLETE"}
        </span>
        <h1>
          {order.paymentMethod === "cod" ? (
            <>You're all <em>set.</em></>
          ) : (
            <>Payment <em>successful.</em></>
          )}
        </h1>
        <p className="success-lead">
          Thank you, {order.customer.name}. Your SoleMotion order has been confirmed.
        </p>

        <div className="order-number-card">
          <span>YOUR ORDER NUMBER</span>
          <strong>{order.orderId}</strong>
          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(order.orderId);
              }
            }}
          >
            Copy order ID
          </button>
        </div>

        <section className="order-details-card">
          <div className="order-card-heading">
            <h2>Order summary</h2>
            <span className="order-status"><Check size={13} /> Confirmed</span>
          </div>

          <div className="success-items">
            {order.items.map((item) => (
              <div className="success-item" key={item.key}>
                <div className="success-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="success-item-info">
                  <strong>{item.name}</strong>
                  <span>{item.color} · UK {item.size}</span>
                  <span>Quantity: {item.quantity}</span>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>

          <div className="success-totals">
            <div><span>Shipping</span><strong>FREE</strong></div>
            <div className="success-total">
              <span>{order.paymentMethod === "cod" ? "Total due" : "Total"}</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          </div>

          <div className="success-payment-info">
            <ShieldCheck size={18} />
            <div>
              <strong>{order.paymentMethod === "cod" ? "Cash on delivery" : "Payment status"}</strong>
              <span>{order.paymentStatus}</span>
            </div>
          </div>

          <div className="success-delivery-info">
            <Truck size={18} />
            <div>
              <strong>Delivery address</strong>
              <span>{order.customer.address}, {order.customer.city} — {order.customer.pincode}</span>
              <span>{order.customer.phone}</span>
              <span>{order.customer.email}</span>
            </div>
          </div>
        </section>

        <div className="success-note">
          <strong>This is a frontend demo order.</strong>
          <p>No real payment was processed and no shipment was created.</p>
        </div>

        <button className="dark-button success-continue" onClick={onContinueShopping}>
          Continue shopping <ArrowRight size={18} />
        </button>
      </main>

      <footer className="success-footer">
        © 2026 SOLEMOTION · MADE FOR EVERYDAY MOVEMENT
      </footer>
    </div>
  );
}

export default function App() {
  const [introLoading, setIntroLoading] = useState(true);

useEffect(() => {
  const timer = window.setTimeout(() => {
    setIntroLoading(false);
  }, 1800);

  return () => window.clearTimeout(timer);
}, []);
  const [activeCategory, setActiveCategory] = useState("All Shoes");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(8000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState(null);
  const [toast, setToast] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch =
        activeCategory === "All Shoes" || product.category === activeCategory;
      const searchMatch =
        `${product.name} ${product.category} ${product.color}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const priceMatch = product.price <= maxPrice;
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size));
      const favoriteMatch =
        !showFavorites || favorites.includes(product.id);

      return categoryMatch && searchMatch && priceMatch && sizeMatch && favoriteMatch;
    });

    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === "newest") result = [...result].sort((a, b) => b.id - a.id);

    return result;
  }, [activeCategory, search, sortBy, maxPrice, selectedSizes, favorites, showFavorites]);
useEffect(() => {
  const selectors = [
    ".product-card",
    ".story-banner",
    ".customer-reviews",
    ".newsletter-section",
    ".benefit-strip",
  ];

  const elements = document.querySelectorAll(selectors.join(","));

  // Add animation classes before observing elements
  elements.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");

    if (element.classList.contains("product-card")) {
      element.style.setProperty(
        "--reveal-delay",
        `${(index % 4) * 100}ms`
      );
    }
  });

  // Respect accessibility preferences
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px",
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  return () => observer.disconnect();
}, [filteredProducts]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2400);
  }

  function addToCart(product, size) {
    const key = `${product.id}-${size}`;

    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, key, size, quantity: 1 }];
    });

    showToast(`${product.name} · UK ${size} added to your bag`);
  }

  function updateQuantity(key, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(key) {
    setCart((current) => current.filter((item) => item.key !== key));
    showToast("Item removed from your bag");
  }

  function toggleFavorite(id) {
    const exists = favorites.includes(id);
    setFavorites((current) =>
      exists ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]
    );
    showToast(exists ? "Removed from wishlist" : "Saved to wishlist");
  }

  function clearFilters() {
    setActiveCategory("All Shoes");
    setSearch("");
    setMaxPrice(8000);
    setSelectedSizes([]);
    setSortBy("featured");
    setShowFavorites(false);
  }

  function placeOrder(details) {
    const order = {
      ...details,
      orderId: `SM${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
    };

    setOrderSuccess(order);
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setQuickProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (orderSuccess) {
    return (
      <OrderSuccess
        order={orderSuccess}
        onContinueShopping={() => {
          setOrderSuccess(null);
          clearFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  return (
    <div className="site-shell" id="home">
      <div className="announcement-bar">
        <span>THE EVERYDAY ATHLETE, REIMAGINED.</span>
        <span className="announcement-right">
          Free shipping on orders over ₹2,999 <ArrowRight size={13} />
        </span>
      </div>

      <header className="site-header">
        <button
          className="mobile-menu-trigger icon-btn"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <BrandLogo />

        <nav className={`main-nav ${mobileMenuOpen ? "nav-open" : ""}`}>
          <a href="#collection" onClick={() => setMobileMenuOpen(false)}>Shop all</a>
          <a href="#collection" onClick={() => { setActiveCategory("Running"); setShowFavorites(false); setMobileMenuOpen(false); }}>Running</a>
          <a href="#collection" onClick={() => { setActiveCategory("Lifestyle"); setShowFavorites(false); setMobileMenuOpen(false); }}>Lifestyle</a>
          <a href="#collection" onClick={() => { setActiveCategory("Training"); setShowFavorites(false); setMobileMenuOpen(false); }}>Training</a>
          <a href="#story" onClick={() => setMobileMenuOpen(false)}>Our story</a>
        </nav>

        <div className="header-actions">
          <button
            className="header-icon"
            onClick={() => document.getElementById("search-input")?.focus()}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            className={`header-icon wishlist-header ${showFavorites ? "header-active" : ""}`}
            onClick={() => {
              setShowFavorites((current) => !current);
              setActiveCategory("All Shoes");
              setSearch("");
              document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
              showToast(showFavorites ? "Showing all shoes" : "Showing your wishlist");
            }}
            aria-label="Toggle wishlist"
          >
            <Heart size={20} />
            {favorites.length > 0 && <span className="header-count">{favorites.length}</span>}
          </button>
          <button
            className="header-icon bag-header"
            onClick={() => setCartOpen(true)}
            aria-label="Shopping bag"
          >
            <ShoppingBag size={20} />
            <span className="header-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="campaign-hero">
          <div className="hero-copy">
            <span className="hero-kicker"><span className="kicker-dot" /> MADE FOR YOUR NEXT MOVE</span>
            <h1>Find your<br />own <em>pace.</em></h1>
            <p>
              Performance meets everyday style. Discover footwear built to move
              with you, wherever your day takes you.
            </p>
            <div className="hero-actions">
              <a href="#collection" className="dark-button">
                Explore the collection <ArrowUpRight size={18} />
              </a>
              <a href="#story" className="text-link">
                Our approach <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-social-proof">
              <div className="proof-avatars"><span>J</span><span>A</span><span>M</span></div>
              <div>
                <div className="proof-stars">★★★★★</div>
                <p>Made for the way you move</p>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle circle-one" />
            <div className="hero-circle circle-two" />
            <div className="hero-side-label">SOLE / MOTION — 2026</div>
            <div className="hero-image-frame">
              <img
                src={products[0].image}
                alt="Featured SoleMotion athletic sneaker"
              />
            </div>
            <div className="hero-product-note">
              <span>01 / THE EVERYDAY RUNNER</span>
              <strong>Velocity Runner Pro</strong>
              <span>Built to go further <ArrowUpRight size={14} /></span>
            </div>
            <div className="hero-sticker">MOVE<br />YOUR<br />WAY<span>↗</span></div>
          </div>
        </section>

        <section className="benefit-strip">
          <div><Truck size={19} /><span>Free shipping over ₹2,999</span></div>
          <div><RotateCcw size={19} /><span>Easy 7-day returns</span></div>
          <div><ShieldCheck size={19} /><span>Secure checkout experience</span></div>
          <div><Check size={19} /><span>Made for everyday movement</span></div>
        </section>

        <section className="collection-section" id="collection">
          <div className="collection-intro">
            <div>
              <span className="eyebrow">
                {showFavorites ? "YOUR SAVED COLLECTION" : "THE FOOTWEAR EDIT / 001"}
              </span>
              <h2>{showFavorites ? <>Your <em>wishlist.</em></> : <>Men's <em>footwear.</em></>}</h2>
              <p>{showFavorites ? "The pairs you've saved for later." : "Find the pair that feels like you."}</p>
            </div>
            <div className="collection-side-note">
              <span>DESIGNED FOR</span>
              <strong>Every kind of day.</strong>
              <span>Every kind of movement.</span>
            </div>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => {
                  setActiveCategory(category);
                  setShowFavorites(false);
                }}
              >
                {category}
              </button>
            ))}
            <span className="category-divider" />
            <span className="product-count">{filteredProducts.length} PRODUCTS</span>
          </div>

          <div className="shop-toolbar">
            <div className="search-wrap">
              <Search size={18} />
              <input
                id="search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search shoes, styles, colours..."
                aria-label="Search shoes"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="toolbar-actions">
              <button
                className={`filter-trigger ${filtersOpen ? "selected" : ""}`}
                onClick={() => setFiltersOpen((open) => !open)}
              >
                <SlidersHorizontal size={17} /> Filters
                {(selectedSizes.length > 0 || maxPrice < 8000) && <span className="filter-dot" />}
              </button>

              <label className="sort-control">
                <ArrowDownUp size={16} />
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
                <ChevronDown size={14} />
              </label>
            </div>
          </div>

          {filtersOpen && (
            <div className="filter-panel">
              <div className="filter-block">
                <div className="filter-heading">
                  <strong>Maximum price</strong>
                  <span>{formatPrice(maxPrice)}</span>
                </div>
                <input
                  className="price-range"
                  type="range"
                  min="2000"
                  max="8000"
                  step="250"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  aria-label="Maximum price"
                />
                <div className="range-labels"><span>₹2,000</span><span>₹8,000</span></div>
              </div>

              <div className="filter-block">
                <div className="filter-heading"><strong>UK shoe size</strong></div>
                <div className="filter-sizes">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      className={selectedSizes.includes(size) ? "selected" : ""}
                      onClick={() => setSelectedSizes((current) =>
                        current.includes(size)
                          ? current.filter((value) => value !== size)
                          : [...current, size]
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="clear-filters" onClick={clearFilters}>
                <RotateCcw size={14} /> Clear all filters
              </button>
            </div>
          )}

          {(search || activeCategory !== "All Shoes" || selectedSizes.length > 0 || maxPrice < 8000 || showFavorites) && (
            <div className="active-filter-line">
              <span>{showFavorites ? "Your saved shoes" : "Showing filtered results"}</span>
              <button onClick={clearFilters}>Clear all <X size={14} /></button>
            </div>
          )}

          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onFavorite={toggleFavorite}
                  onQuickView={setQuickProduct}
                  onAdd={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={28} />
              <h3>{showFavorites ? "Your wishlist is empty." : "No shoes found."}</h3>
              <p>
                {showFavorites
                  ? "Tap the heart on any shoe to save it here."
                  : "Try another search or clear your filters to see all styles."}
              </p>
              <button className="dark-button" onClick={clearFilters}>
                Show all shoes <ArrowRight size={17} />
              </button>
            </div>
          )}

          <div className="collection-end">
            <span>END OF THIS EDIT</span>
            <span>GOOD THINGS TAKE YOU PLACES. <ArrowUpRight size={14} /></span>
          </div>
        </section>

        <section className="story-banner" id="story">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=85"
              alt="Runner moving outdoors"
              loading="lazy"
            />
            <span className="image-caption">MOTION IS A MINDSET / 001</span>
          </div>
          <div className="story-copy">
            <span className="eyebrow">MORE THAN THE MILES</span>
            <h2>Made for the<br />way <em>you move.</em></h2>
            <p>
              Early starts. Long walks. Last-minute plans. Your shoes should
              keep up with all of it. SoleMotion brings thoughtful design and
              everyday comfort together in every pair.
            </p>
            <a href="#collection" className="story-link">
              Find your next pair <ArrowUpRight size={18} />
            </a>
            <span className="story-index">SM / 001 — MOVE WITH INTENTION</span>
          </div>
        </section>
<CustomerReviews />
        <section className="newsletter-section">
          
          <div>
            <span className="eyebrow">THE SOLEMOTION LETTER</span>
            <h2>A little more <em>movement.</em></h2>
            <p>New drops, fresh ideas, and first access. Straight to your inbox.</p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
                setNewsletterMessage("Enter a valid email address.");
                return;
              }
              setNewsletterMessage("Thanks for joining the SoleMotion list!");
              setNewsletterEmail("");
            }}
          >
            <div className="newsletter-input-row">
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                aria-label="Your email address"
                required
              />
              <button type="submit" aria-label="Subscribe"><ArrowRight size={19} /></button>
            </div>
            <p className="newsletter-note">
              {newsletterMessage || "By subscribing, you agree to receive SoleMotion updates."}
            </p>
          </form>
        </section>
      </main>

      

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdate={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onPlaceOrder={placeOrder}
        />
      )}

      {quickProduct && (
        <QuickView
          product={quickProduct}
          onClose={() => setQuickProduct(null)}
          onAdd={addToCart}
        />
      )}

      {toast && <div className="toast-message"><Check size={17} /> {toast}</div>}

      <button className="floating-cart" onClick={() => setCartOpen(true)} aria-label="Open shopping bag">
        <ShoppingBag size={20} />
        <span>Bag</span>
        <b>{cartCount}</b>
      </button>
      <Footer />
    </div>
  );
}
