import { Rules } from "@fredes/constraints";

interface RiboControllerOptions {
  name?: string;
  endpoint?: string;
}

export type RiboController = string | RiboControllerOptions;

export interface RiboProps {
  component?: string;
  controller?: RiboController;
  endpoint?: string;
  constraints?: Rules;
  children?: any;
  settings: RiboSettings;
  accesses?: RiboAccesses;
}

export interface RiboSettings {
  defaultError?: string;
  componentsList: Record<string, any>;
  controllersList: Record<string, any>;
  modifiersList: Record<string, any>;
}

export interface RiboConstraints {
  children?: any;
  constraints?: Rules;
  accesses: RiboAccesses;
}

interface RiboAccesses {
  active: boolean;
  data: Record<string, any>;
}
