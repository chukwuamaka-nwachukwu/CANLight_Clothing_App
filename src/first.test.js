/* eslint-disable no-undef */
describe("CANLight Clothing Jest Setup", () => {
  test("Jest is working correctly", () => {
    expect(1 + 1).toBe(2);
  });

  test("CANLight is a clothing application", () => {
    const appName = "CANLight Clothing";

    expect(appName).toBe("CANLight Clothing");
  });
});