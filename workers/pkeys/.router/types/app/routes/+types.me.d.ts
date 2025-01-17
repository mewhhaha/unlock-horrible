import type {
  InferActionArgs,
  InferComponentProps,
  InferHeadersArgs,
  InferLoaderArgs,
  InferPartialArgs,
} from "@mewhhaha/htmx-router/types";
import * as r from "./me.js";

export type RouteParams = Record<never, never>;

export type ComponentProps = InferComponentProps<typeof r>;
export type LoaderArgs = InferLoaderArgs<RouteParams>;
export type PartialArgs = InferPartialArgs<RouteParams>;
export type ActionArgs = InferActionArgs<RouteParams>;
export type HeadersArgs = InferHeadersArgs<RouteParams, typeof r>;