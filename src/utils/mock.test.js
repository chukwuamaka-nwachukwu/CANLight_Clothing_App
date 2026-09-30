/* eslint-disable no-undef */
describe("Jest mocks", () => {
  test("mock function records how it was called", () => {
    const mockFunction = jest.fn();

    mockFunction("CANLight");

    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith("CANLight");
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test("mock function can return a fake value", () => {
    const mockFunction = jest.fn();

    mockFunction.mockReturnValue("CANLight Clothing");

    const result = mockFunction();

    expect(result).toBe("CANLight Clothing");
  });

  test("mock function can return different values", () => {
    const mockFunction = jest.fn();

    mockFunction
      .mockReturnValueOnce("First")
      .mockReturnValueOnce("Second")
      .mockReturnValueOnce("Third");

    expect(mockFunction()).toBe("First");
    expect(mockFunction()).toBe("Second");
    expect(mockFunction()).toBe("Third");
  });
});