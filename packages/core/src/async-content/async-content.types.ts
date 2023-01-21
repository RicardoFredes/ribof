import { Modifiers } from "@fredes/json-schema-transpiler";
import { ComponentType } from "react";

export interface AsyncContentDataProps {
  data: any;
  Component: AsyncContentComponent;
  parseChildren: (children: any) => any;
  schema?: any;
  defaultChildren?: any;
  modifiersList: Modifiers;
}

export interface AsyncContentSkeletonProps {
  Component: AsyncContentComponent;
}

export interface AsyncContentProps extends Omit<AsyncContentDataProps, "data"> {
  keyName?: string;
  fetcher: () => Promise<any>;
  errorMessage?: string;
}

export type AsyncContentComponent<T = any> = ComponentType & {
  Error?: ComponentType<T>;
  Skeleton?: ComponentType<T>;
};

export interface AsyncContentComponentProps {
  Component: AsyncContentComponent;
  error?: string;
}
