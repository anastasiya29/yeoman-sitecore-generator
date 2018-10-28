import { ComponentOptions } from "../../src/foundation/services/ComponentOptions";

describe("ComponentOptions tests", () => {

  describe("CamelToSnakeCase tests", () => {
    it("multi-word phrases should work", () => {
      const input = "multiWordPhrase", expected = "multi-word-phrase";
      expect(ComponentOptions.camelToSnakeCase(input)).toBe(expected);
    });

    it("single-word phrases should work", () => {
      const input = "word", expected = "word";
      expect(ComponentOptions.camelToSnakeCase(input)).toBe(expected);
    });

    it("empty phrases should work", () => {
      const input = "", expected = "";
      expect(ComponentOptions.camelToSnakeCase(input)).toBe(expected);
    });

    it("null phrases should throw error", () => {
      const input = null;
      expect(() => ComponentOptions.camelToSnakeCase(input)).toThrowError();
    });
  });
});
