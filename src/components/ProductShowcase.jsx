
import { useState } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductShowcase({
  products = [],
  onAdd,
  onSelect,
  favorites = [],
  onFavorite,
}) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Running", "Lifestyle", "Training"];

  const filteredProducts = products.filter((product) => {
    const category = product.category.toLowerCase();

    if (filter === "All") return true;

    if (filter === "Running") {
      return category.includes("running");
    }

    if (filter === "Lifestyle") {
      return category.includes("comfort") || category.includes("urban");
    }

    if (filter === "Training") {
      return category.includes("training") || category.includes("gym");
    }

    return true;
  });

  return (
    <section className="collection-section section-pad" id="collection">
      <div className="section-heading reveal">
        <div>
          <span className="section-kicker">THE COLLECTION / 2026</span>

          <h2>
            Find your <span className="accent-text">stride.</span>
          </h2>

          <p>
            Built different. Worn everywhere. Find the pair that moves with you.
          </p>
        </div>

        <a href="#story" className="view-all">
          Our story <ArrowRight size={17} />
        </a>
      </div>

      <div className="collection-toolbar">
        <div className="filter-list" aria-label="Filter products">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-button ${
                filter === category ? "filter-active" : ""
              }`}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              {category}
            </button>
          ))}
        </div>

        <span className="product-count">
          <SlidersHorizontal size={15} />
          {filteredProducts.length} PRODUCTS
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div
              className="reveal"
              style={{ "--reveal-delay": `${index * 100}ms` }}
              key={product.id}
            >
              <ProductCard
                product={product}
                onAdd={onAdd}
                onSelect={onSelect}
                isFavorite={favorites.includes(product.id)}
                onFavorite={onFavorite}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-cart">
          <h3>No products found</h3>
          <p>Try selecting another category.</p>
          <button
            className="primary-button"
            onClick={() => setFilter("All")}
          >
            View all products
          </button>
        </div>
      )}
    </section>
  );
}
