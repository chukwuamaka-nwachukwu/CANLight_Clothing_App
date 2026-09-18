import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product, addItemToCart }) => {
  const { name, price, imageUrl } = product;

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} className="product-card-image" />
      <div className="product-card-footer">
        <span className="name">{name}</span>
        <span className="price">₦{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
