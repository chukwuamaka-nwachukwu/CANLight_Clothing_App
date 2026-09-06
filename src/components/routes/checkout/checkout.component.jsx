import "react";
import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../../contexts/cart.context";
import { formatPrice } from "../../../utils/formatPrice";

const Checkout = () => {
  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <h1>CHECKOUT</h1>
      <div className="checkout-header">
        <div className="header-block"><span>Product</span></div>
        <div className="header-block"><span>Description</span></div>
        <div className="header-block"><span>Quantity</span></div>
        <div className="header-block"><span>Price</span></div>
        <div className="header-block"><span>Remove</span></div>
      </div>

      <div className="checkout-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => {
            const { id, name, imageUrl, price, quantity } = cartItem;
            return (
              <div key={id} className="checkout-item">
                <div className="image-container">
                  <img src={imageUrl} alt={name} />
                </div>
                <span className="description">{name}</span>
                <span className="quantity">
                  <span className="arrow" onClick={() => removeItemFromCart(cartItem)}>❮</span>
                  <span className="value">{quantity}</span>
                  <span className="arrow" onClick={() => addItemToCart(cartItem)}>❯</span>
                </span>
                <span className="price">₦{formatPrice(price * quantity)}</span>
                <span className="remove-button" onClick={() => clearItemFromCart(cartItem)}>✕</span>
              </div>
            );
          })
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>

      <div className="checkout-total">
        <span>Total: ₦{formatPrice(cartTotal)}</span>
      </div>
    </div>
  );
};
export default Checkout;