import "react";
import ShoppingIcon from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
    const {isCartOpen,setIsCartOpen,cartItemCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <img src={ShoppingIcon} alt="Shopping Bag" className="shopping-icon" />
            <span className="item-count">{cartItemCount}</span>
        </div>
    )

}
export default CartIcon; 