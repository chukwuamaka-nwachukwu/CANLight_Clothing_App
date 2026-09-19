
export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_CATEGORIES_LOADING: "SET_CATEGORIES_LOADING",
  SET_CATEGORIES_ERROR: "SET_CATEGORIES_ERROR",
};

export const INITIAL_CATEGORIES_STATE = {
  categoriesMap: {},
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = INITIAL_CATEGORIES_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: payload,
        error: null,
      };

    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categoriesMap: payload || {},
        isLoading: false,
        error: null,
      };

    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};
