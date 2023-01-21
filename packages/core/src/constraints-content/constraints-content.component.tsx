import constraints from "constraints";
import { useEffect, useState } from "react";
import { ConstraintsProps } from "./constraints-content.types";

const ConstraintsContent = ({ active, children, ...props }: ConstraintsProps) => {
  if (!active) return null;

  const hasConstraints = Object.keys(props.rules).length > 0;
  if (!hasConstraints) return children;

  return <Constraints {...props}>{children}</Constraints>;
};

const Constraints = ({ rules, children, data }: Omit<ConstraintsProps, "active">) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const constraintsResult = constraints(data, rules);
    setShow(constraintsResult);
  }, []);

  if (!show) return null;

  return children;
};

export default ConstraintsContent;
