// =========================
// ACTION TYPES
// =========================
export const CART_ACTION_TYPES = {
  SET_CART_OPEN: "SET_CART_OPEN",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_ITEM: "CLEAR_ITEM",
  CLEAR_CART: "CLEAR_CART",
};

// =========================
// INITIAL STATE
// =========================
export const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

// =========================
// HELPERS
// =========================
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

  if (!existingCartItem) return cartItems;

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((item) => item.id !== cartItemToClear.id);

const calculateCartTotals = (cartItems) => {
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.quantity * Number(item.price || 0),
    0
  );
  return { cartCount, cartTotal };
};

// =========================
// REDUCER
// =========================
export const cartReducer = (state = INITIAL_CART_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return { ...state, isCartOpen: payload };

    case CART_ACTION_TYPES.ADD_ITEM: {
      const cartItems = addCartItem(state.cartItems, payload);
      const { cartCount, cartTotal } = calculateCartTotals(cartItems);
      return { ...state, cartItems, cartCount, cartTotal };
    }

    case CART_ACTION_TYPES.REMOVE_ITEM: {
      const cartItems = removeCartItem(state.cartItems, payload);
      const { cartCount, cartTotal } = calculateCartTotals(cartItems);
      return { ...state, cartItems, cartCount, cartTotal };
    }

    case CART_ACTION_TYPES.CLEAR_ITEM: {
      const cartItems = clearCartItem(state.cartItems, payload);
      const { cartCount, cartTotal } = calculateCartTotals(cartItems);
      return { ...state, cartItems, cartCount, cartTotal };
    }

    case CART_ACTION_TYPES.CLEAR_CART:
      return { ...INITIAL_CART_STATE, isCartOpen: state.isCartOpen };

    default:
      return state; // ✅ safe default
  }
};
