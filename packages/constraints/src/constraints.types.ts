export type Values = string | boolean | number | null | undefined | object;
export type Input = Record<string, Values | Values[]>;

export type Rule = {
  key: string;
  value: Values;
};

export type Operation =
  | "and"
  | "or"
  | "not"
  | "equal"
  | "less"
  | "greater"
  | "contains"
  | "not-contains";

export type Branches = {
  operation: Operation;
  left: Rules;
  right: Rules;
};

export type Rules = Branches | Rule;
