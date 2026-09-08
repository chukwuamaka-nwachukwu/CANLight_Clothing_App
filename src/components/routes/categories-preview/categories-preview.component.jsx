import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">{title ? title.toUpperCase() : ""}</span>
      </h2>
      <div className="preview">
        {Array.isArray(products) &&
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

// 👉 Keep the Shop function here
export const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="shop-page">
      <h2 className="shop-title">Featured Collection</h2>
      <p className="shop-subtitle">Curated styles for modern elegance</p>
      <Fragment>
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={products}
            />
          );
        })}
      </Fragment>
    </div>
  );
};

export default CategoryPreview;
