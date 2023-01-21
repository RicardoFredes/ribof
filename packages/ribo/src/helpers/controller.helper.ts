import { RiboController } from "../ribo/ribo.types";

export const getControllerName = (controller?: RiboController): string => {
  if (typeof controller === "string") return controller;
  return controller?.name || "";
};

export const getControllerEndpoint = (controller?: RiboController, endpoint?: string): string => {
  if (typeof controller === "string") return endpoint || "";
  return controller?.endpoint || endpoint || "";
};
