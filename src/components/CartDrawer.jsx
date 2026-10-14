
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "../data/products";

export default function CartDrawer({
  open,
  onClose,
  cart,
  onQuantity,
  onRemove,
  onCheckout,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        className={`drawer-backdrop ${open ? "backdrop-visible" : ""}`}
        aria-label="Close shopping cart"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={`cart-drawer ${open ? "drawer-open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="drawer-header">
          <div>
            <span className="section-kicker">YOUR SELECTION</span>
            <h2>
              Your bag <span>({count})</span>
            </h2>
          </div>

          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={21} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={30} />
            </div>

            <h3>Your next move starts here.</h3>
            <p>Your bag is empty. Discover a pair made for you.</p>

            <button className="primary-button" onClick={onClose}>
              Explore collection
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <article
                  className="cart-item"
                  key={`${item.id}-${item.size}`}
                >
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>
                      {item.color} · UK {item.size}
                    </p>
                    <strong>{formatPrice(item.price)}</strong>

                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          onQuantity(
                            item.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={13} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          onQuantity(
                            item.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => onRemove(item.id, item.size)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>

            <div className="drawer-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <p>
                Shipping and applicable taxes are calculated at checkout.
              </p>

              <button
                className="primary-button checkout-button"
                onClick={onCheckout}
              >
                Continue to checkout
                <span>{formatPrice(total)}</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
