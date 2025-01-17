import type { Env } from "./router.mjs";
import { type JSX } from "./runtime/jsx.mjs";

export type InferComponentProps<module> = {
  children?: JSX.Element;
  loaderData: module extends {
    loader: infer loader extends (...args: any) => any;
  }
    ? Awaited<ReturnType<loader>>
    : undefined;
};

export type InferLoaderArgs<params extends Record<string, string>> = {
  request: Request;
  params: params;
  context: [Env, ExecutionContext];
};

export type InferPartialArgs<params extends Record<string, string>> = {
  request: Request;
  params: params;
  context: [Env, ExecutionContext];
};

export type InferActionArgs<params extends Record<string, string>> = {
  request: Request;
  params: params;
  context: [Env, ExecutionContext];
};

export type InferHeadersArgs<params extends Record<string, string>, module> = {
  params: params;
  headers: Headers;
  context: [Env, ExecutionContext];
  loaderData: module extends {
    loader: infer loader extends (...args: any) => any;
  }
    ? ReturnType<loader>
    : undefined;
};
