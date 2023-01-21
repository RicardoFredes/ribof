import type { Input, Rules } from "./constraints.types";

import constraints from "./constraints";

describe("constraints", () => {
  describe("simple rules", () => {
    const rules: Rules = { key: "any_key", value: "any_value" };

    it("should return false if input is invalid", () => {
      expect(constraints({}, rules)).toBeFalsy();
      // @ts-ignore
      expect(constraints(new Error(), new Error())).toBeFalsy();
    });

    it("should return false if input not matches to rules", () => {
      expect(constraints({}, rules)).toBeFalsy();
      expect(constraints({ any_key: false }, rules)).toBeFalsy();
    });

    it("should return true if input matches to rules", () => {
      expect(constraints({ any_key: "any_value" }, rules)).toBeTruthy();
    });
  });

  describe('rules with "and operation', () => {
    const rules: Rules = {
      operation: "and",
      key: "access",
      value: false,
    };

    it('should return true if rules requires a "false" but input has a undefined value', () => {
      expect(constraints({}, rules)).toBeTruthy();
    });
  });

  describe('rules with "not" operation', () => {
    const rules: Rules = {
      operation: "not",
      key: "any_key",
      value: "any_value",
    };

    it("should return true if input matches to rules", () => {
      expect(constraints({ any_key: "another_value" }, rules)).toBeTruthy();
    });
  });

  describe('rules with "less" operation', () => {
    const rules: Rules = {
      operation: "less",
      key: "number",
      value: 1,
    };

    it("should return true if input matches to rules", () => {
      expect(constraints({ number: 0 }, rules)).toBeTruthy();
    });

    it("should return false if input not matches to rules", () => {
      expect(constraints({ number: 1 }, rules)).toBeFalsy();
      expect(constraints({ number: 10 }, rules)).toBeFalsy();
    });
  });

  describe('rules with "greater" operation', () => {
    const rules: Rules = {
      operation: "greater",
      key: "number",
      value: 1,
    };

    it("should return true if input matches to rules", () => {
      expect(constraints({ number: 2 }, rules)).toBeTruthy();
    });

    it("should return false if input not matches to rules", () => {
      expect(constraints({ number: 1 }, rules)).toBeFalsy();
      expect(constraints({ number: 0 }, rules)).toBeFalsy();
      expect(constraints({ number: "0" }, rules)).toBeFalsy();
    });
  });

  describe('rules with "contains" operation', () => {
    const rules: Rules = {
      operation: "contains",
      key: "labels",
      value: "medicine",
    };

    it("should return true if input matches to rules", () => {
      expect(constraints({ labels: ["medicine", "enem"] }, rules)).toBeTruthy();
      expect(constraints({ labels: "medicine-class" }, rules)).toBeTruthy();
    });

    it("should return false if input NOT matches to rules", () => {
      expect(constraints({}, rules)).toBeFalsy();
      expect(constraints({ labels: ["any_label", "enem"] }, rules)).toBeFalsy();
      expect(constraints({ labels: [] }, rules)).toBeFalsy();
      expect(constraints({ labels: "med" }, rules)).toBeFalsy();
      expect(constraints({ labels: undefined }, rules)).toBeFalsy();
      expect(constraints({ labels: null }, rules)).toBeFalsy();
      expect(constraints({ labels: 123 }, rules)).toBeFalsy();
    });
  });

  describe('rules with "not-contains" operation', () => {
    const rules: Rules = {
      operation: "not-contains",
      key: "labels",
      value: "medicine",
    };

    it("should return true if input matches to rules", () => {
      expect(constraints({}, rules)).toBeTruthy();
      expect(constraints({ labels: ["redação", "enem"] }, rules)).toBeTruthy();
      expect(constraints({ labels: "redação" }, rules)).toBeTruthy();
      expect(constraints({ labels: undefined }, rules)).toBeTruthy();
      expect(constraints({ labels: null }, rules)).toBeTruthy();
      expect(constraints({ labels: 123 }, rules)).toBeTruthy();
      expect(constraints({ labels: [] }, rules)).toBeTruthy();
    });

    it("should return false if input NOT matches to rules", () => {
      expect(constraints({ labels: ["medicine", "enem"] }, rules)).toBeFalsy();
      expect(constraints({ labels: "medicine-class" }, rules)).toBeFalsy();
    });
  });

  describe('branch rules with "and" operation', () => {
    const rules: Rules = {
      operation: "and",
      left: { key: "left_key", value: true },
      right: { key: "right_key", value: true },
    };

    it("should return false if input not matches to rules", () => {
      expect(constraints({ any_key: false }, rules)).toBeFalsy();
      expect(constraints({ left_key: false }, rules)).toBeFalsy();
      expect(constraints({ right_key: false }, rules)).toBeFalsy();
      expect(constraints({ left_key: true, right_key: false }, rules)).toBeFalsy();
      expect(constraints({ left_key: false, right_key: true }, rules)).toBeFalsy();
      expect(constraints({ left_key: true }, rules)).toBeFalsy();
    });

    it("should return true if input matches to rules", () => {
      expect(constraints({ left_key: true, right_key: true }, rules)).toBeTruthy();
    });
  });

  describe('branch rules with "or" operation', () => {
    const rules: Rules = {
      operation: "or",
      left: { key: "left_key", value: true },
      right: { key: "right_key", value: true },
    };

    it("should return false if input not matches to rules", () => {
      expect(constraints({ any_key: false }, rules)).toBeFalsy();
      expect(constraints({ left_key: false }, rules)).toBeFalsy();
      expect(constraints({ right_key: false }, rules)).toBeFalsy();
      expect(constraints({ left_key: false, right_key: false }, rules)).toBeFalsy();
    });

    it("should return true if input matches to rules", () => {
      expect(constraints({ left_key: true, right_key: true }, rules)).toBeTruthy();
      expect(constraints({ left_key: true, right_key: false }, rules)).toBeTruthy();
      expect(constraints({ left_key: false, right_key: true }, rules)).toBeTruthy();
      expect(constraints({ left_key: true }, rules)).toBeTruthy();
    });

    it("should match a or rules with contains", () => {
      const rules: Rules = {
        operation: "or",
        left: {
          operation: "contains",
          key: "roleSlugs",
          value: "dev",
        },
        right: {
          operation: "contains",
          key: "roleSlugs",
          value: "manager",
        },
      };
      expect(constraints({ roleSlugs: [] }, rules)).toBeFalsy();
      expect(constraints({ roleSlugs: ["dev"] }, rules)).toBeTruthy();
      expect(constraints({ roleSlugs: ["manager"] }, rules)).toBeTruthy();
      expect(constraints({ roleSlugs: ["dev", "manager"] }, rules)).toBeTruthy();
      expect(constraints({ roleSlugs: ["beta-tester"] }, rules)).toBeFalsy();
    });
  });

  describe('branch rules with both operations ("and", "or")', () => {
    const rules: Rules = {
      operation: "and",
      left: { key: "first_key", value: true },
      right: {
        operation: "or",
        left: { key: "secondary_key", value: true },
        right: { key: "third_key", value: true },
      },
    };

    it("should return false if input not matches to rules", () => {
      expect(constraints({ first_key: false }, rules)).toBeFalsy();
      expect(constraints({ first_key: true, secondary_key: false }, rules)).toBeFalsy();
      expect(constraints({ first_key: true, third_key: false }, rules)).toBeFalsy();
    });

    it("should return true if input matches to rules", () => {
      expect(constraints({ first_key: true, secondary_key: true }, rules)).toBeTruthy();
      expect(constraints({ first_key: true, third_key: true }, rules)).toBeTruthy();
    });
  });

  describe("deep input", () => {
    const input: Input = {
      a: true,
      b: {
        c: true,
        d: [true, true],
        e: {
          f: true,
        },
      },
    };

    it("should return true when get deep input value", () => {
      expect(constraints(input, { key: "a", value: true })).toBeTruthy();
      expect(constraints(input, { key: "a.b", value: true })).toBeFalsy();
      expect(constraints(input, { key: "b.c", value: true })).toBeTruthy();
      expect(constraints(input, { key: "b.e.f", value: true })).toBeTruthy();
      expect(constraints(input, { key: "b.d", value: true })).toBeTruthy();
    });
  });
});
