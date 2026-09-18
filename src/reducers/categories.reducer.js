export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_CATEGORIES_LOADING: "SET_CATEGORIES_LOADING",
  SET_CATEGORIES_ERROR: "SET_CATEGORIES_ERROR",
};

export const INITIAL_CATEGORIES_STATE = {
  categoriesMap: {},   // ✅ start as empty object
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = INITIAL_CATEGORIES_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categoriesMap: payload || {}, // ✅ guard against null
        isLoading: false,
        error: null,
      };

    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state; // ✅ safe default
  }
};
