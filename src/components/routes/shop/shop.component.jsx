import { useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CategoryPreview from "../../category-preview/category-preview.component";
import Category from "../category/category.component";
import Spinner from "../../spinner/spinner.component";

import {
  selectCategoriesMap,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../../../store/categories/categories.selectors";

import "./shop.styles.scss";

const Shop = () => {
  const navigate = useNavigate();

  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  const [searchTerm, setSearchTerm] = useState("");

  /*
  ============================================================
  CONVERT ALL CATEGORY PRODUCTS INTO ONE ARRAY
  ============================================================

  Example:

  {
    dresses: [...],
    shoes: [...],
    shirts: [...]
  }

  becomes:

  [
    {
      ...product,
      categoryName: "dresses"
    },
    ...
  ]
  */

  const allProducts = useMemo(() => {
    if (!categoriesMap || typeof categoriesMap !== "object") {
      return [];
    }

    return Object.entries(categoriesMap).flatMap(
      ([categoryName, products]) => {
        if (!Array.isArray(products)) {
          return [];
        }

        return products.map((product) => ({
          ...product,
          categoryName,
        }));
      }
    );
  }, [categoriesMap]);

  /*
  ============================================================
  FILTER PRODUCTS
  ============================================================
  */

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return allProducts.filter((product) => {
      const productName = String(product.name || "").toLowerCase();

      const category = String(
        product.categoryName ||
          product.category ||
          ""
      ).toLowerCase();

      const description = String(
        product.description || ""
      ).toLowerCase();

      return (
        productName.includes(search) ||
        category.includes(search) ||
        description.includes(search)
      );
    });
  }, [allProducts, searchTerm]);

  /*
  ============================================================
  CLEAR SEARCH
  ============================================================
  */

  const clearSearch = () => {
    setSearchTerm("");
  };

  /*
  ============================================================
  OPEN SEARCH RESULT
  ============================================================

  When the user clicks a search result:

  /shop
        ↓
  /shop/category-name

  The product ID/name is also passed in navigation state so
  the Category page can identify the product that was clicked.
  */

  const handleSearchProductClick = (product) => {
    if (!product) {
      return;
    }

    const categoryName =
      product.categoryName ||
      product.category ||
      "";

    if (!categoryName) {
      return;
    }

    /*
      Keep the category exactly as it exists in the Redux map.

      encodeURIComponent makes this safe for categories such as:
      "women's-wear"
      "men shoes"
      "bags & accessories"
    */

    const categoryPath = encodeURIComponent(
      String(categoryName).trim()
    );

    navigate(`/shop/${categoryPath}`, {
      state: {
        searchProductId:
          product.id ||
          product.productId ||
          null,

        searchProductName:
          product.name || "",
      },
    });

    /*
      Clear the search after navigating so that when the user
      reaches the category page, the normal category layout
      appears.
    */
    setSearchTerm("");
  };

  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (isLoading) {
    return (
      <div className="shop-page shop-page-loading">
        <Spinner />
      </div>
    );
  }

  /*
  ============================================================
  ERROR
  ============================================================
  */

  if (error) {
    return (
      <div className="shop-page shop-page-error">
        <div className="shop-error-card">
          <div className="shop-error-icon">!</div>

          <h2>Unable to load products</h2>

          <p>
            {error?.message ||
              "Something went wrong while loading the store."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* =====================================================
          MAIN SHOP PAGE
      ====================================================== */}

      <Route
        index
        element={
          <div className="shop-page">

            {/* =================================================
                SHOP HEADER
            ================================================== */}

            <div className="shop-header">
              <h1 className="shop-title">
                Style Showcase
              </h1>

              <p className="shop-subtitle">
                Handpicked fashion for modern living
              </p>
            </div>

            {/* =================================================
                SEARCH BAR
            ================================================== */}

            <div className="shop-search-container">
              <div className="shop-search-box">

                <span
                  className="shop-search-icon"
                  aria-hidden="true"
                >
                  🔍
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search for clothes, shoes, accessories..."
                  aria-label="Search products"
                  autoComplete="off"
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="shop-search-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* =================================================
                SEARCH RESULTS
            ================================================== */}

            {searchTerm.trim() ? (
              <section className="shop-search-results">

                <div className="shop-search-results-header">
                  <div>
                    <span className="shop-search-results-label">
                      STORE SEARCH
                    </span>

                    <h2>
                      Search Results
                    </h2>
                  </div>

                  <span className="shop-search-count">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="shop-search-products">

                    {filteredProducts.map(
                      (product, index) => (
                        <button
                          type="button"
                          className="shop-search-product"
                          key={
                            product.id ||
                            product.productId ||
                            `${product.categoryName}-${product.name}-${index}`
                          }
                          onClick={() =>
                            handleSearchProductClick(product)
                          }
                          aria-label={`View ${product.name}`}
                        >

                          {/* PRODUCT IMAGE */}

                          <div className="shop-search-product-image-wrapper">

                            <img
                              src={
                                product.imageUrl ||
                                product.image ||
                                product.imageURL ||
                                "/placeholder-product.jpg"
                              }
                              alt={product.name || "Product"}
                              className="shop-search-product-image"
                              loading="lazy"
                            />

                            <div className="shop-search-product-overlay">
                              <span>
                                VIEW PRODUCT
                              </span>
                            </div>

                          </div>

                          {/* PRODUCT INFORMATION */}

                          <div className="shop-search-product-info">

                            <span className="shop-search-product-category">
                              {product.categoryName ||
                                product.category ||
                                "Collection"}
                            </span>

                            <h3>
                              {product.name ||
                                "Unnamed Product"}
                            </h3>

                            {product.description && (
                              <p className="shop-search-product-description">
                                {product.description}
                              </p>
                            )}

                            <div className="shop-search-product-bottom">

                              <p className="shop-search-product-price">
                                ₦
                                {Number(
                                  product.price || 0
                                ).toLocaleString()}
                              </p>

                              <span className="shop-search-arrow">
                                →
                              </span>

                            </div>

                          </div>
                        </button>
                      )
                    )}

                  </div>
                ) : (
                  <div className="shop-no-results">

                    <div className="shop-no-results-icon">
                      🔎
                    </div>

                    <h2>
                      No products found
                    </h2>

                    <p>
                      We couldn't find anything
                      matching{" "}
                      <strong>
                        "{searchTerm}"
                      </strong>
                      .
                    </p>

                    <button
                      type="button"
                      onClick={clearSearch}
                    >
                      CLEAR SEARCH
                    </button>

                  </div>
                )}

              </section>
            ) : (
              /* =================================================
                  NORMAL SHOP
              ================================================== */

              <div className="shop-categories">

                {categoriesMap &&
                Object.keys(categoriesMap).length > 0 ? (
                  Object.keys(categoriesMap).map(
                    (title) => (
                      <CategoryPreview
                        key={title}
                        title={title}
                        products={
                          categoriesMap[title]
                        }
                      />
                    )
                  )
                ) : (
                  <div className="shop-no-products">

                    <div className="shop-no-products-icon">
                      🛍️
                    </div>

                    <h2>
                      No products available
                    </h2>

                    <p>
                      There are currently no
                      products available in the
                      store.
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>
        }
      />

      {/* =====================================================
          CATEGORY ROUTE
      ====================================================== */}

      <Route
        path=":category"
        element={<Category />}
      />
    </Routes>
  );
};

export default Shop;