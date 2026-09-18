// src/reducers/user.reducer.js

// =========================
// ACTION TYPES
// =========================
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// =========================
// INITIAL STATE
// =========================
export const INITIAL_USER_STATE = {
  currentUser: null,
};

// =========================
// USER REDUCER
// =========================
export const userReducer = (state = INITIAL_USER_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      // ✅ Always return state for unknown actions (like @@redux/INIT)
      return state;
  }
};
