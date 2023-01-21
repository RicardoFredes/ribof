import { Branches, Input, Rule, Rules, Values } from "./constraints.types";

function constraints(input: Input, rules: Rules): boolean {
  const { key, value: ruleValue } = rules as Rule;
  const { operation, right, left } = rules as Branches;

  if (typeof key === "string") {
    const inputValue = getValueByKey(key, input);

    if (operation === "not") return inputValue !== ruleValue;

    const areNumbers = typeof inputValue === "number" && typeof ruleValue === "number";
    if (operation === "less") return areNumbers && inputValue < ruleValue;
    if (operation === "greater") return areNumbers && inputValue > ruleValue;
    if (operation === "contains") return contains(ruleValue, inputValue);
    if (operation === "not-contains") return !contains(ruleValue, inputValue);
    if (typeof ruleValue === "boolean") return Boolean(inputValue) === ruleValue;

    // default operation = "and"
    return inputValue === ruleValue;
  }
  if (!operation || !right || !left) return false;
  if (operation === "and") return constraints(input, right) && constraints(input, left);

  // or operation
  return constraints(input, right) || constraints(input, left);
}

const contains = (value: Values, search: Values | Values[]): boolean => {
  if (Array.isArray(search)) return search.includes(value);
  if (typeof search === "string" && typeof value === "string") {
    return new RegExp(value).test(search);
  }
  return false;
};

const getValueByKey = (key: string, input: Input): any => {
  if (!key) return undefined;
  const [firstKey, ...keys] = key.split(".");
  const value = input?.[firstKey];
  if (keys.length === 0) return value;
  const subKey = keys.join(".");
  return getValueByKey(subKey, value as Input);
};

export default constraints;
