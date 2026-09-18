import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

export const selectCartCount = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartCount
);

export const selectCartTotal = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartTotal
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);
