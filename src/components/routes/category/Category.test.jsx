/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Category from "./Category";
import { CART_ACTION_TYPES } from "../../../reducers/cart.reducer";

// Mock React Redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock React Router
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

// Mock ProductCard
jest.mock("../../product-card/product-card.component", () => {
  return function MockProductCard({ product, addItemToCart }) {
    return (
      <div data-testid="product-card">
        <h3>{product.name}</h3>

        <button onClick={() => addItemToCart(product)}>
          Add {product.name} to cart
        </button>
      </div>
    );
  };
});

describe("Category", () => {
  const mockDispatch = jest.fn();

  const mockProducts = [
    {
      id: "1",
      name: "Classic Black T-Shirt",
      price: 15000,
    },
    {
      id: "2",
      name: "White CANLight Hoodie",
      price: 25000,
    },
    {
      id: "3",
      name: "Blue Denim Jacket",
      price: 35000,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockReturnValue(mockDispatch);

    useParams.mockReturnValue({
      category: "jackets",
    });

    useSelector.mockImplementation((selector) =>
      selector({
        categories: {
          categoriesMap: {
            jackets: mockProducts,
          },
        },
      })
    );
  });

  test("renders the category title", () => {
    render(<Category />);

    expect(
      screen.getByRole("heading", {
        name: "JACKETS",
      })
    ).toBeInTheDocument();
  });

  test("renders all products in the selected category", () => {
    render(<Category />);

    const productCards = screen.getAllByTestId("product-card");

    expect(productCards).toHaveLength(3);
  });

  test("renders each product name", () => {
    render(<Category />);

    expect(
      screen.getByRole("heading", {
        name: "Classic Black T-Shirt",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "White CANLight Hoodie",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Blue Denim Jacket",
      })
    ).toBeInTheDocument();
  });

  test("uses the category from the URL", () => {
    useParams.mockReturnValue({
      category: "hoodies",
    });

    useSelector.mockImplementation((selector) =>
      selector({
        categories: {
          categoriesMap: {
            hoodies: [
              {
                id: "10",
                name: "CANLight Hoodie",
                price: 30000,
              },
            ],
          },
        },
      })
    );

    render(<Category />);

    expect(
      screen.getByRole("heading", {
        name: "HOODIES",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "CANLight Hoodie",
      })
    ).toBeInTheDocument();
  });

  test("renders no products when the category does not exist", () => {
    useParams.mockReturnValue({
      category: "shoes",
    });

    useSelector.mockImplementation((selector) =>
      selector({
        categories: {
          categoriesMap: {},
        },
      })
    );

    render(<Category />);

    expect(
      screen.getByRole("heading", {
        name: "SHOES",
      })
    ).toBeInTheDocument();

    expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
  });

  test("dispatches ADD_ITEM when a product is added to cart", async () => {
    const user = userEvent.setup();

    render(<Category />);

    const addButton = screen.getByRole("button", {
      name: "Add Classic Black T-Shirt to cart",
    });

    await user.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CART_ACTION_TYPES.ADD_ITEM,
      payload: mockProducts[0],
    });
  });
});