
import {
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { formatPrice } from "../data/products";

export default function ProductCard({
  product,
  onAdd,
  onSelect,
  isFavorite = false,
  onFavorite,
}) {
  if (!product) return null;

  return (
    <article className="product-card">
      <div
        className="product-image-area"
        style={{ "--shoe-accent": product.colorHex || "#c9fa42" }}
      >
        <span className="product-tag">{product.tag || "NEW ARRIVAL"}</span>

        <button
          type="button"
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          aria-label={
            isFavorite
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => onFavorite?.(product.id)}
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          className="product-image-button"
          onClick={() => onSelect?.(product)}
          aria-label={`View ${product.name} details`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </button>

        <button
          type="button"
          className="quick-add"
          onClick={() => onAdd?.(product)}
        >
          <ShoppingBag size={17} />
          Add to bag
        </button>
      </div>

      <div className="product-info">
        <div className="product-category-row">
          <span>{product.category}</span>

          <span className="product-rating">
            <Star size={13} fill="currentColor" />
            {product.rating}
          </span>
        </div>

        <button
          type="button"
          className="product-name"
          onClick={() => onSelect?.(product)}
        >
          {product.name}
          <ArrowUpRight size={16} />
        </button>

        <div className="product-bottom">
          <div className="product-prices">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice > product.price && (
              <del>{formatPrice(product.oldPrice)}</del>
            )}
          </div>

          <span
            className="color-dot"
            style={{ background: product.colorHex || "#c9fa42" }}
            title={product.color || "Default color"}
          />
        </div>
      </div>
    </article>
  );
}
