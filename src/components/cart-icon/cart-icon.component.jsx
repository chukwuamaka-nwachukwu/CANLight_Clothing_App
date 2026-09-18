import { useSelector, useDispatch } from "react-redux";
import ShoppingBagIcon from "../../assets/shopping-bag.svg";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { CART_ACTION_TYPES } from "../../reducers/cart.reducer";

import {
  selectIsCartOpen,
  selectCartCount,
  selectCartItems,
} from "../../store/cart/cart.selectors";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();

  // ✅ Use Reselect selectors
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);

  const toggleCartDropdown = () =>
    dispatch({ type: CART_ACTION_TYPES.SET_CART_OPEN, payload: !isCartOpen });

  return (
    <div className="cart-icon-container">
      <div className="shopping-icon" onClick={toggleCartDropdown}>
        <img src={ShoppingBagIcon} className="shopping-icon" alt="Cart" />
        <span className="item-count">{cartCount}</span>
      </div>
      {isCartOpen && <CartDropdown cartItems={cartItems} />}
    </div>
  );
};

export default CartIcon;
