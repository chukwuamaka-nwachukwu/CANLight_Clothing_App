import "./checkout.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { CART_ACTION_TYPES } from "../../../reducers/cart.reducer";
import { formatPrice } from "../../../utils/formatPrice";

import {
  selectCartItems,
  selectCartTotal,
} from "../../../store/cart/cart.selectors";

const Checkout = () => {
  const dispatch = useDispatch();

  // ✅ Use Reselect selectors
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const addItemToCart = (item) =>
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: item });
  const removeItemFromCart = (item) =>
    dispatch({ type: CART_ACTION_TYPES.REMOVE_ITEM, payload: item });
  const clearItemFromCart = (item) =>
    dispatch({ type: CART_ACTION_TYPES.CLEAR_ITEM, payload: item });

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
          cartItems.map(({ id, name, imageUrl, price, quantity }) => (
            <div key={id} className="checkout-item">
              <div className="image-container">
                <img src={imageUrl} alt={name} />
              </div>
              <span className="description">{name}</span>
              <span className="quantity">
                <span className="arrow" onClick={() => removeItemFromCart({ id })}>❮</span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={() => addItemToCart({ id, name, imageUrl, price })}>❯</span>
              </span>
              <span className="price">₦{formatPrice(price * quantity)}</span>
              <span className="remove-button" onClick={() => clearItemFromCart({ id })}>✕</span>
            </div>
          ))
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
