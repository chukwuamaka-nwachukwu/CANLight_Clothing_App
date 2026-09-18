import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categoriesMap
);

export const selectCategoriesLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.error
);
