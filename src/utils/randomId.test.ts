import { randomId } from "./randomId";

describe("randomId", () => {
  it("should return a random id", () => {
    const result = randomId();
    expect(result).toMatch(/^[a-z0-9]+$/);
  });

  it("should return a different id each time", () => {
    const result1 = randomId();
    const result2 = randomId();
    expect(result1).not.toEqual(result2);
  });
});
