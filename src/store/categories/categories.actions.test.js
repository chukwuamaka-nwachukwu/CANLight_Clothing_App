/* eslint-disable no-undef */
import { fetchCategoriesAsync } from "./categories.actions";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  CATEGORIES_ACTION_TYPES,
} from "../../reducers/categories.reducer";

jest.mock("../../utils/firebase/firebase.utils", () => ({
  getCategoriesAndDocuments: jest.fn(),
}));

describe("fetchCategoriesAsync", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("dispatches loading true before fetching categories", async () => {
    const dispatch = jest.fn();

    getCategoriesAndDocuments.mockResolvedValue({
      jackets: [
        {
          id: "1",
          name: "Jacket",
        },
      ],
    });

    await fetchCategoriesAsync()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LOADING,
      payload: true,
    });
  });

  test("fetches categories and dispatches normalized categories", async () => {
    const dispatch = jest.fn();

    getCategoriesAndDocuments.mockResolvedValue({
      Jackets: [
        {
          id: "1",
          name: "Jacket",
        },
      ],
      Shirts: [
        {
          id: "2",
          name: "Shirt",
        },
      ],
    });

    await fetchCategoriesAsync()(dispatch);

    expect(getCategoriesAndDocuments).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LOADING,
      payload: true,
    });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
      payload: {
        jackets: [
          {
            id: "1",
            name: "Jacket",
          },
        ],
        shirts: [
          {
            id: "2",
            name: "Shirt",
          },
        ],
      },
    });
  });

  test("converts category names to lowercase", async () => {
    const dispatch = jest.fn();

    getCategoriesAndDocuments.mockResolvedValue({
      JACKETS: [],
      "T-Shirts": [],
      Hoodies: [],
    });

    await fetchCategoriesAsync()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
      payload: {
        jackets: [],
        "t-shirts": [],
        hoodies: [],
      },
    });
  });

  test("dispatches an error action when fetching categories fails", async () => {
    const dispatch = jest.fn();

    const error = new Error("Firebase failed");

    getCategoriesAndDocuments.mockRejectedValue(error);

    await fetchCategoriesAsync()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ERROR,
      payload: error,
    });
  });

  test("does not throw when Firebase fetching fails", async () => {
    const dispatch = jest.fn();

    const error = new Error("Firebase failed");

    getCategoriesAndDocuments.mockRejectedValue(error);

    await expect(
      fetchCategoriesAsync()(dispatch)
    ).resolves.toBeUndefined();
  });
});