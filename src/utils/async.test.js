/* eslint-disable no-undef */
const fetchProducts = jest.fn();

describe("Asynchronous tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("waits for a successful asynchronous result", async () => {
    fetchProducts.mockResolvedValue([
      {
        id: "1",
        name: "T-Shirt",
      },
      {
        id: "2",
        name: "Hoodie",
      },
    ]);

    const products = await fetchProducts();

    expect(products).toHaveLength(2);
    expect(products[0].name).toBe("T-Shirt");
    expect(products[1].name).toBe("Hoodie");
  });

  test("handles an asynchronous error", async () => {
    const error = new Error("Failed to load products");

    fetchProducts.mockRejectedValue(error);

    await expect(fetchProducts()).rejects.toThrow(
      "Failed to load products"
    );
  });
});