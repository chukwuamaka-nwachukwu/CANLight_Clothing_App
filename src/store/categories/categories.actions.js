import { CATEGORIES_ACTION_TYPES } from "../../reducers/categories.reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch({ type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LOADING, payload: true });

  try {
    const categoryMap = await getCategoriesAndDocuments();

    const normalizedMap = {};
    for (const key in categoryMap) {
      normalizedMap[key.toLowerCase()] = categoryMap[key];
    }

    dispatch({ type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES, payload: normalizedMap });
  } catch (error) {
    dispatch({ type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ERROR, payload: error });
  }
};
