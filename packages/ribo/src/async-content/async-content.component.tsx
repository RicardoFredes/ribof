import useSWR from "swr";
import { jsonSchemaModifier } from "../imports";
import {
  AsyncContentComponentProps,
  AsyncContentDataProps,
  AsyncContentProps,
  AsyncContentSkeletonProps
} from "./async-content.types";

const AsyncContent = ({ Component, fetcher, errorMessage, keyName, ...props }: AsyncContentProps) => {
  // This swrName ensures get different data by query string like page number
  const queryString = typeof window === 'undefined' ? "" : window.location.search;
  const swrName = `${keyName}${queryString}`;

  const { data, error } = useSWR(swrName, fetcher, { dedupingInterval: 0 });

  if (error) return <AsyncContentError Component={Component} error={errorMessage} />;

  if (!data) return <AsyncContentSkeleton Component={Component} />;

  return <AsyncContentData {...props} Component={Component} data={data} />;
};

const AsyncContentError = ({
  Component,
  error = "Não foi possível carregar os dados",
}: AsyncContentComponentProps) => {
  if (Component?.Error) return <Component.Error />;
  return <div className="ribo__async-component--error">{error}</div>;
};

const AsyncContentSkeleton = ({ Component }: AsyncContentSkeletonProps) => {
  if (Component?.Skeleton) return <Component.Skeleton />;
  return <div className="ribo__async-component--is-loading" />;
};

const AsyncContentData = ({
  data,
  schema,
  modifiersList,
  Component,
  parseChildren,
  ...props
}: AsyncContentDataProps) => {
  const { children, ...dataProps } =
    (schema ? jsonSchemaModifier(data, schema, modifiersList) : data) || {};
  return (
    <Component {...props} {...dataProps}>
      {parseChildren(children)}
    </Component>
  );
};

export default AsyncContent;
