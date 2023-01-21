import type { Input, Rules } from "@fredes/constraints";

export interface ConstraintsProps {
  rules: Rules;
  children: any;
  data: Input;
  active: boolean;
}
