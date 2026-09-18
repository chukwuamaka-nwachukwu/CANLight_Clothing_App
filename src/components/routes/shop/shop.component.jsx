import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import CategoryPreview from "../../category-preview/category-preview.component";
import Category from "../category/category.component";

import {
  selectCategoriesMap,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../../../store/categories/categories.selectors";

import "./shop.styles.scss";

const Shop = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  if (isLoading) return <div className="shop-page"><h2>Loading products...</h2></div>;
  if (error) return <div className="shop-page"><h2>Unable to load products.</h2><p>{error.message}</p></div>;

  return (
    <Routes>
      <Route
        index
        element={
          <div className="shop-page">
            {/* ✅ Page header + subtitle */}
            <h1 className="shop-title">Style Showcase </h1>
            <p className="shop-subtitle">Handpicked fashion for modern living</p>

            {categoriesMap && Object.keys(categoriesMap).length > 0 ? (
              Object.keys(categoriesMap).map((title) => (
                <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
              ))
            ) : (
              <h2>No products available</h2>
            )}
          </div>
        }
      />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
