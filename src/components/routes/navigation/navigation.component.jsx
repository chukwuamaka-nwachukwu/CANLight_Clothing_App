import "react";
import {Fragment, useContext} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Lightlogo from "../../../assets/logo.svg";
import "./navigation.styles.scss";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";


const Navigation = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext);
    const{isCartOpen} = useContext(CartContext)


    const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  return(
    <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <img src={Lightlogo} alt="Logo" className="logo" />
                <h1>CANLight Clothing</h1>
            </Link>
            <div className="nav-links-container">
           {/* Username appears first */}
          {currentUser ? (
            <span className="username">
              {currentUser.displayName || currentUser.email}
            </span>
          ) : (
            <span className="signed-out-message">You are signed out</span>
          )}

          {/* Then SHOP and SIGN IN/OUT */}
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
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
        </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;