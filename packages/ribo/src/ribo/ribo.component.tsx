import type { RiboConstraints, RiboProps } from "./ribo.types";

import AsyncContent from "../async-content/async-content.component";
import ConstraintsContent from "../constraints-content";
import { getComponent } from "../helpers/component.helper";
import { getControllerEndpoint, getControllerName } from "../helpers/controller.helper";

const Ribo = ({
  component = "",
  controller,
  endpoint,
  constraints,
  children = [],
  settings,
  accesses = {
    active: false,
    data: {},
  },
  ...props
}: RiboProps) => {
  const { defaultError, componentsList, controllersList, modifiersList } = settings;
  try {
    const Component = getComponent(componentsList, component);
    const parseChildren = (children: any) => mountChildren(children, { settings, accesses });
    const ComponentChildren = () => parseChildren(children);

    if (!Component) return <ComponentChildren />;

    const controllerName = getControllerName(controller);
    const fetcher = controllersList[controllerName];
    const Container = ({ children }: RiboConstraints["children"]) => (
      <Constraints constraints={constraints} accesses={accesses}>
        {children}
      </Constraints>
    );

    if (!fetcher) {
      return (
        <Container>
          <Component {...props}>
            <ComponentChildren />
          </Component>
        </Container>
      );
    }

    const controllerEndpoint = getControllerEndpoint(controller, endpoint);

    return (
      <Container>
        <AsyncContent
          keyName={`${controller}${controllerEndpoint}`}
          fetcher={() => fetcher(controllerEndpoint)}
          Component={Component}
          modifiersList={modifiersList}
          parseChildren={parseChildren}
          {...props}
        />
      </Container>
    );
  } catch (error) {
    return <div className="ribo__component--error">{defaultError}</div>;
  }
};

const Constraints = ({ children, constraints, accesses }: RiboConstraints) => {
  if (!constraints) return children;
  return (
    <ConstraintsContent rules={constraints} {...accesses}>
      {children}
    </ConstraintsContent>
  );
};

const mountChildren = (children: any, options = {}) => {
  if (typeof children !== "object") return children;

  const parseChild = (child: any, index?: number) => (
    <Ribo key={String(index)} {...child} {...options} />
  );

  if (Array.isArray(children)) {
    return children.map(parseChild);
  }

  return parseChild(children);
};

export default Ribo;
