/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductCard from "./product-card.component";

describe("ProductCard", () => {
  const mockProduct = {
    id: "product-1",
    name: "CANLight T-Shirt",
    price: 15000,
    imageUrl: "https://example.com/tshirt.jpg",
  };

  const mockAddItemToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the product name", () => {
    render(
      <ProductCard
        product={mockProduct}
        addItemToCart={mockAddItemToCart}
      />
    );

    expect(
      screen.getByText("CANLight T-Shirt")
    ).toBeInTheDocument();
  });

  test("renders the product price", () => {
    render(
      <ProductCard
        product={mockProduct}
        addItemToCart={mockAddItemToCart}
      />
    );

    expect(
      screen.getByText("₦15000")
    ).toBeInTheDocument();
  });

  test("renders the product image", () => {
    render(
      <ProductCard
        product={mockProduct}
        addItemToCart={mockAddItemToCart}
      />
    );

    const image = screen.getByRole("img", {
      name: "CANLight T-Shirt",
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://example.com/tshirt.jpg"
    );
    expect(image).toHaveAttribute(
      "alt",
      "CANLight T-Shirt"
    );
  });

  test("renders the Add to Cart button", () => {
    render(
      <ProductCard
        product={mockProduct}
        addItemToCart={mockAddItemToCart}
      />
    );

    expect(
      screen.getByRole("button", {
        name: "ADD TO CART",
      })
    ).toBeInTheDocument();
  });

  test("calls Add to Cart when clicked", async () => {
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProduct}
        addItemToCart={mockAddItemToCart}
      />
    );

    const button = screen.getByRole("button", {
      name: "ADD TO CART",
    });

    await user.click(button);

    expect(mockAddItemToCart).toHaveBeenCalledTimes(1);

    expect(mockAddItemToCart).toHaveBeenCalledWith(
      mockProduct
    );
  });
});
test("can spy on console.log", () => {
  const consoleSpy = jest
    .spyOn(console, "log")
    .mockImplementation(() => {});

  console.log("CANLight");

  expect(consoleSpy).toHaveBeenCalledWith("CANLight");

  consoleSpy.mockRestore();
});
test("matches the snapshot", () => {
  const { container } = render(
    <ProductCard
      product={mockProduct}
      addItemToCart={mockAddItemToCart}
    />
  );

  expect(container).toMatchSnapshot();
});