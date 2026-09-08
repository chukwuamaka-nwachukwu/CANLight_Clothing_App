import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../../contexts/categories.context";
import ProductCard from "../../product-card/product-card.component";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  const products = categoriesMap[category] || [];

  return (
    <div className="category-page">
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
