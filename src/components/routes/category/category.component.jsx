import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../../product-card/product-card.component";
import { CART_ACTION_TYPES } from "../../../reducers/cart.reducer";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const categoriesMap = useSelector((state) => state.categories.categoriesMap);
  const products = categoriesMap[category.toLowerCase()] || [];

  const addItemToCart = (product) =>
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: product });

  return (
    <div className="category-page">
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addItemToCart={addItemToCart} />
        ))}
      </div>
    </div>
  );
};

export default Category;
