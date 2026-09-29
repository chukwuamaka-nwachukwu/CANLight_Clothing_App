
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductCard from "../product-card/product-card.component";
import { CART_ACTION_TYPES } from "../../reducers/cart.reducer";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  const dispatch = useDispatch();

  const previewRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProducts = Array.isArray(products)
    ? products.filter((_, idx) => idx < 4)
    : [];

  const addItemToCart = (product) =>
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM,
      payload: product,
    });

  /* =========================================================
     UPDATE ACTIVE CARD WHEN USER SWIPES
  ========================================================= */

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview || visibleProducts.length === 0) return;

    const updateActiveCard = () => {
      const cards = preview.querySelectorAll(".category-slide");

      if (!cards.length) return;

      const previewCenter =
        preview.scrollLeft + preview.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter =
          card.offsetLeft + card.offsetWidth / 2;

        const distance = Math.abs(
          cardCenter - previewCenter
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    preview.addEventListener("scroll", updateActiveCard, {
      passive: true,
    });

    updateActiveCard();

    return () => {
      preview.removeEventListener("scroll", updateActiveCard);
    };
  }, [visibleProducts.length]);

  /* =========================================================
     SCROLL TO PREVIOUS / NEXT CARD
  ========================================================= */

  const scrollToCard = (index) => {
    const preview = previewRef.current;

    if (!preview) return;

    const cards = preview.querySelectorAll(".category-slide");

    if (!cards[index]) return;

    setActiveIndex(index);

    cards[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  /* =========================================================
     PREVIOUS CARD
  ========================================================= */

  const handlePrevious = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (activeIndex <= 0) return;

    scrollToCard(activeIndex - 1);
  };

  /* =========================================================
     NEXT CARD
  ========================================================= */

  const handleNext = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (activeIndex >= visibleProducts.length - 1) return;

    scrollToCard(activeIndex + 1);
  };

  return (
    <div className="category-preview-container">

      {/* =====================================================
          CATEGORY TITLE
      ===================================================== */}

      <h2>
        <Link
          className="title"
          to={`/shop/${title}`}
        >
          {title ? title.toUpperCase() : ""}
        </Link>
      </h2>

      {/* =====================================================
          CATEGORY PRODUCTS
      ===================================================== */}

      <div
        className="preview"
        ref={previewRef}
      >
        {visibleProducts.map((product, index) => (
          <div
            className={`category-slide ${
              index === activeIndex ? "active" : ""
            }`}
            key={product.id}
          >

            {/* =================================================
                LEFT ARROW
            ================================================= */}

            <button
              type="button"
              className={`category-arrow category-arrow-left ${
                index === 0 ? "disabled" : ""
              }`}
              onClick={handlePrevious}
              disabled={index !== activeIndex || index === 0}
              aria-label="Previous category"
            >
              &#10094;
            </button>

            {/* =================================================
                PRODUCT CARD
            ================================================= */}

            <ProductCard
              product={product}
              addItemToCart={addItemToCart}
            />

            {/* =================================================
                RIGHT ARROW
            ================================================= */}

            <button
              type="button"
              className={`category-arrow category-arrow-right ${
                index === visibleProducts.length - 1
                  ? "disabled"
                  : ""
              }`}
              onClick={handleNext}
              disabled={
                index !== activeIndex ||
                index === visibleProducts.length - 1
              }
              aria-label="Next category"
            >
              &#10095;
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
