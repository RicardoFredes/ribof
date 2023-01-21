import { isHTMLTag } from "./html.helper";

export const getComponent = (componentList: Record<string, any>, componentName?: string) => {
  if (!componentName) return null;
  if (isHTMLTag(componentName)) return componentName;
  const Component = componentList[componentName];
  if (!Component) return null;
  return Component;
};
