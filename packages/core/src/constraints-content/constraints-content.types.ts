import type { Input, Rules } from "constraints";

export interface ConstraintsProps {
  rules: Rules;
  children: any;
  data: Input;
  active: boolean;
}
