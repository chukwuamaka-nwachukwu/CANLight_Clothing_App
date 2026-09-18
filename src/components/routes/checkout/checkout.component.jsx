import "./checkout.styles.scss";

import { useDispatch, useSelector } from "react-redux";

import {
  CART_ACTION_TYPES,
} from "../../../reducers/cart.reducer";

import { formatPrice } from "../../../utils/formatPrice";

import {
  selectCartItems,
  selectCartTotal,
} from "../../../store/cart/cart.selectors";

import CheckoutForm from "../../checkout-form/CheckoutForm.component";
import right from "../../../assets/right.png";
import left from "../../../assets/left.png";

const Checkout = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const addItemToCart = (item) =>
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM,
      payload: item,
    });

  const removeItemFromCart = (item) =>
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM,
      payload: item,
    });

  const clearItemFromCart = (item) =>
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_ITEM,
      payload: item,
    });

  return (
    <div className="checkout-container">

      <h1>CHECKOUT</h1>

      {cartItems.length > 0 ? (
        <>
          {/* =========================================
              CHECKOUT HEADER
              ========================================= */}

          <div className="checkout-header">

            <div className="header-block">
              <span>Product</span>
            </div>

            <div className="header-block">
              <span>Description</span>
            </div>

            <div className="header-block">
              <span>Quantity</span>
            </div>

            <div className="header-block">
              <span>Price</span>
            </div>

            <div className="header-block">
              <span>Remove</span>
            </div>

          </div>


          {/* =========================================
              CART ITEMS
              ========================================= */}

          <div className="checkout-items">

            {cartItems.map(
              ({
                id,
                name,
                imageUrl,
                price,
                quantity,
              }) => (

                <div
                  key={id}
                  className="checkout-item"
                >

                  <div className="image-container">
                    <img
                      src={imageUrl}
                      alt={name}
                    />
                  </div>

                  <span className="description">
                    {name}
                  </span>

                  <span className="quantity">

                    <button
                      type="button"
                      className="quantity-arrow"
                      onClick={() =>
                        removeItemFromCart({ id })
                      }
                    >
                      <img className="quantity-icon"src={left} />
                    </button>

                    <span className="value">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      className="quantity-arrow"
                      onClick={() =>
                        addItemToCart({
                          id,
                          name,
                          imageUrl,
                          price,
                        })
                      }
                    >
                      <img className="quantity-icon"src={right} />
                    </button>

                  </span>

                  <span className="price">
                    ₦
                    {formatPrice(
                      price * quantity
                    )}
                  </span>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      clearItemFromCart({ id })
                    }
                  >
                    ✕
                  </button>

                </div>
              )
            )}

          </div>


          {/* =========================================
              TOTAL
              ========================================= */}

          <div className="checkout-total">

            <span>
              Total:
            </span>

            <strong>
              ₦{formatPrice(cartTotal)}
            </strong>

          </div>


          {/* =========================================
              PAYSTACK
              ========================================= */}

          <CheckoutForm
            cartTotal={cartTotal}
            cartItems={cartItems}
          />

        </>
      ) : (

        <div className="empty-message">
          Your cart is empty.
        </div>

      )}

    </div>
  );
};

export default Checkout;