import { Star, ArrowUpRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    location: "Bengaluru, India",
    product: "Velocity Runner Pro",
    rating: 5,
    date: "September 18, 2026",
    color: "#dce7cb",
    text: "The design is clean, the fit feels comfortable, and the shoes work just as well for everyday wear as they do for a walk.",
  },
  {
    id: 2,
    name: "Priya Nair",
    initials: "PN",
    location: "Kochi, India",
    product: "Urban Motion",
    rating: 5,
    date: "September 12, 2026",
    color: "#f0dcd1",
    text: "I love the minimalist look. They pair easily with casual outfits, and the lightweight design is exactly what I was looking for.",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    initials: "RM",
    location: "Mumbai, India",
    product: "Flex Training",
    rating: 4,
    date: "September 5, 2026",
    color: "#dce2ef",
    text: "A versatile everyday style with a sporty feel. The product presentation and size-selection experience are simple and easy to use.",
  },
];

function Stars({ rating }) {
  return (
    <div
      className="review-stars"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((number) => (
        <Star
          key={number}
          size={14}
          fill={number <= rating ? "currentColor" : "none"}
          strokeWidth={1.5}
          className={number <= rating ? "star-filled" : "star-empty"}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) /
    reviews.length;

  return (
    <section className="customer-reviews" id="reviews">
      <div className="reviews-container">
        {/* Section heading */}
        <div className="reviews-heading">
          <div>
            <span className="eyebrow">THE WORD ON SOLEMOTION</span>

            <h2>
              Moves that make
              <br />
              <em>an impression.</em>
            </h2>

            <p>
              A closer look at what people appreciate about everyday footwear.
            </p>
          </div>

          <div className="reviews-overview">
            <div className="reviews-average">
              {averageRating.toFixed(1)}
              <span>/ 5</span>
            </div>

            <Stars rating={Math.round(averageRating)} />

            <p>Sample rating overview</p>
            <span className="reviews-count">
              {reviews.length} sample testimonials
            </span>
          </div>
        </div>

        {/* Review cards */}
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article
              className="review-card"
              key={review.id}
              style={{ "--review-delay": `${index * 100}ms` }}
            >
              <div className="review-card-top">
                <Quote size={25} strokeWidth={1.4} />

                <Stars rating={review.rating} />
              </div>

              <p className="review-text">“{review.text}”</p>

              <div className="review-product">
                <span className="review-product-dot" />
                {review.product}
              </div>

              <div className="review-divider" />

              <div className="review-author">
                <div
                  className="review-avatar"
                  style={{ backgroundColor: review.color }}
                >
                  {review.initials}
                </div>

                <div className="review-author-details">
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                </div>

                <div className="review-rating-number">
                  {review.rating}.0
                  <Star size={12} fill="currentColor" />
                </div>
              </div>

              <p className="review-date">{review.date}</p>
            </article>
          ))}
        </div>

        {/* Bottom call to action */}
        <div className="reviews-bottom">
          <p>
            <strong>Found your perfect pair?</strong>
            <span> Share your experience with the SoleMotion community.</span>
          </p>

          <a href="#collection">
            Explore footwear
            <ArrowUpRight size={17} />
          </a>
        </div>

        <p className="reviews-demo-note">
          Design preview: these are illustrative testimonials, not verified
          customer reviews. Replace them with genuine customer feedback before
          publishing.
        </p>
      </div>
    </section>
  );
}