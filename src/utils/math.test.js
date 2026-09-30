/* eslint-disable no-undef */
import { add } from "./math";

describe("Math utilities", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});