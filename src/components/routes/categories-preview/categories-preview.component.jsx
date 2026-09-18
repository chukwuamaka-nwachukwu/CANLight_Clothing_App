import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductCard from "../../product-card/product-card.component";
import { CART_ACTION_TYPES } from "../../../reducers/cart.reducer";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  const dispatch = useDispatch();

  const addItemToCart = (product) =>
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: product });

  return (
    <Fragment>
      <h2 className="category-preview-title">
        <Link to={`/shop/${title}`}>{title.toUpperCase()}</Link>
      </h2>
      <div className="category-preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} addItemToCart={addItemToCart} />
          ))}
      </div>
    </Fragment>
  );
};

export default CategoryPreview;
