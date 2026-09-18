import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductCard from "../product-card/product-card.component";
import { CART_ACTION_TYPES } from "../../reducers/cart.reducer";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  const dispatch = useDispatch();

  const addItemToCart = (product) =>
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: product });

  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={`/shop/${title}`}>
          {title ? title.toUpperCase() : ""}
        </Link>
      </h2>
      <div className="preview">
        {Array.isArray(products) &&
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} addItemToCart={addItemToCart} />
            ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
