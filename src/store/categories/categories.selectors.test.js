/* eslint-disable no-undef */
import {
  selectCategoriesMap,
  selectCategoriesLoading,
  selectCategoriesError,
} from "./categories.selectors";

describe("Categories Selectors", () => {
  const mockCategoriesMap = {
    jackets: [
      {
        id: "1",
        name: "Jacket",
        price: 30000,
      },
    ],

    shirts: [
      {
        id: "2",
        name: "Shirt",
        price: 15000,
      },
    ],
  };

  const state = {
    categories: {
      categoriesMap: mockCategoriesMap,
      isLoading: false,
      error: null,
    },
  };

  test("selectCategoriesMap returns the categories map", () => {
    expect(selectCategoriesMap(state)).toBe(mockCategoriesMap);
  });

  test("selectCategoriesLoading returns the loading state", () => {
    expect(selectCategoriesLoading(state)).toBe(false);
  });

  test("selectCategoriesError returns the error", () => {
    expect(selectCategoriesError(state)).toBeNull();
  });

  test("selectCategoriesLoading returns true when categories are loading", () => {
    const loadingState = {
      categories: {
        categoriesMap: {},
        isLoading: true,
        error: null,
      },
    };

    expect(selectCategoriesLoading(loadingState)).toBe(true);
  });

  test("selectCategoriesError returns an error when one exists", () => {
    const error = new Error("Failed to load categories");

    const errorState = {
      categories: {
        categoriesMap: {},
        isLoading: false,
        error,
      },
    };

    expect(selectCategoriesError(errorState)).toBe(error);
  });
});