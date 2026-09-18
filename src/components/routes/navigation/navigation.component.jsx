import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Lightlogo from "../../../assets/logo.svg";
import CartIcon from "../../cart-icon/cart-icon.component";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { setCurrentUser } from "../../../store/user/user.actions";

import { selectCurrentUser } from "../../../store/user/user.selectors";
import { selectIsCartOpen, selectCartCount, selectCartItems } from "../../../store/cart/cart.selectors";

import "./navigation.styles.scss";

const Navigation = () => {
  const dispatch = useDispatch();

  // ✅ Use Reselect selectors
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);

  const signOutHandler = async () => {
    try {
      await signOutUser();
      dispatch(setCurrentUser(null)); // clears Redux user state
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={Lightlogo} alt="Logo" className="logo" />
          <h1>CANLight Clothing</h1>
        </Link>

        <div className="nav-links-container">
          {currentUser ? (
            <span className="username">
              {currentUser.displayName || currentUser.email}
            </span>
          ) : (
            <span className="signed-out-message">You are signed out</span>
          )}

          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}

          {/* ✅ CartIcon now reads from Redux selectors */}
          <CartIcon
            isCartOpen={isCartOpen}
            cartCount={cartCount}
            cartItems={cartItems}
          />
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
