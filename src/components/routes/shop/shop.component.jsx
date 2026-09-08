import  { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { CategoriesContext } from "../../../contexts/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Routes>
      {/* Preview page at /shop */}
      <Route
        index
        element={
          <div className="shop-page">
            <h2 className="shop-title">Featured Collection</h2>
            <p className="shop-subtitle">Curated styles for modern elegance</p>
            {Object.keys(categoriesMap).map((title) => (
              <CategoryPreview
                key={title}
                title={title}
                products={categoriesMap[title]}
              />
            ))}
          </div>
        }
      />
      {/* Dynamic category page at /shop/:category */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
