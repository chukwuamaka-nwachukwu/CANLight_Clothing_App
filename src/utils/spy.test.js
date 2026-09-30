/* eslint-disable no-undef */
const shoppingCart = {
  addItem(item) {
    return `Added ${item}`;
  },

  removeItem(item) {
    return `Removed ${item}`;
  },
};

describe("Jest spies", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("spy watches an existing function", () => {
    const addItemSpy = jest.spyOn(shoppingCart, "addItem");

    const result = shoppingCart.addItem("T-Shirt");

    expect(result).toBe("Added T-Shirt");

    expect(addItemSpy).toHaveBeenCalledWith("T-Shirt");

    expect(addItemSpy).toHaveBeenCalledTimes(1);
  });

  test("spy can temporarily replace the function", () => {
    const addItemSpy = jest
      .spyOn(shoppingCart, "addItem")
      .mockReturnValue("Fake result");

    const result = shoppingCart.addItem("Hoodie");

    expect(result).toBe("Fake result");

    expect(addItemSpy).toHaveBeenCalledWith("Hoodie");
  });

  test("original function works again after restoring the spy", () => {
    const result = shoppingCart.addItem("Jeans");

    expect(result).toBe("Added Jeans");
  });
});