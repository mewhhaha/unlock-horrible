import { match } from "./match.mjs";
import { type JSX } from "./runtime/jsx.mjs";
import { into } from "./runtime/node.mts";

export interface Env {}

export interface ctx {
  request: Request;
  params: Record<string, string>;
  context: [Env, ExecutionContext];
}

export type partial = (params: any) => JSX.SingleElement | undefined | null;
export type loader = (params: any) => any;
export type action = (params: any) => any;
export type renderer = (props: any) => JSX.SingleElement;
export type headers = (
  params: ctx & {
    loaderData: any | never;
    headers: Headers;
  },
) => void | Promise<void>;

export type mod = {
  loader?: loader;
  action?: action;
  default?: renderer;
  headers?: headers;
  partial?: partial;
};

export type fragment = { id: string; mod: mod; params?: string[] };

export type route = [path: string, fragments: fragment[]];

export type router = {
  handle: (request: Request, ...args: ctx["context"]) => Promise<Response>;
};

export const Router = (routes: route[]): router => {
  const handle = async (
    request: Request,
    ...args: ctx["context"]
  ): Promise<Response> => {
    const { target, fragments, partials, params } = matchRoute(routes, request);
    if (!fragments) {
      return new Response(null, { status: 404 });
    }

    const ctx = { request, params, context: args };

    try {
      const leaf = fragments[fragments.length - 1].mod;

      if (request.method === "GET") {
        if (leaf.default) {
          return await routeResponse(target, fragments, partials, ctx);
        }

        if (leaf.loader) {
          return await loaderResponse(leaf.loader, ctx);
        }
      } else {
        if (leaf.action) {
          return await actionResponse(leaf.action, ctx);
        }
      }

      return new Response(null, { status: 404 });
    } catch (e) {
      if (e instanceof Response) {
        return e;
      }

      if (e instanceof Error) {
        console.error(e.message);
      }

      return new Response(null, { status: 500 });
    }
  };

  return {
    handle,
  };
};

export const diff = (
  current: { params: Record<string, string>; fragments: fragment[] },
  next: { params: Record<string, string>; fragments: fragment[] },
): {
  target?: string | undefined;
  params: Record<string, string>;
  fragments: fragment[];
  partials: fragment[];
} => {
  const index = findDiffIndex(current, next);

  return {
    target: next.fragments.at(index - 1)?.id,
    params: next.params,
    fragments: next.fragments.slice(index),
    partials: next.fragments.slice(0, index),
  };
};

const matchRoute = (routes: route[], request: Request) => {
  const url = new URL(request.url);
  const next = findRoute(routes, url.pathname);
  if (!next) {
    return {
      target: undefined,
      fragments: undefined,
      partials: undefined,
      params: undefined,
    };
  }

  const browserUrl = request.headers.get("hx-current-url");
  if (!browserUrl) {
    return { target: undefined, partials: [], ...next };
  }
  const current = findRoute(routes, new URL(browserUrl).pathname);
  if (!current) {
    return { target: undefined, partials: [], ...next };
  }

  return diff(current, next);
};

const findRoute = (routes: route[], pathname: string) => {
  const segments = pathname.split("/");
  for (const route of routes) {
    const params = match(segments, route[0].split("/"));
    if (params) {
      return { fragments: route[1], params };
    }
  }
  return undefined;
};

const actionResponse = async (action: action, ctx: ctx) => {
  const value = await action(ctx);
  if (value instanceof Response) {
    return value;
  }
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

const loaderResponse = async (loader: loader, ctx: ctx) => {
  const value = await loader(ctx);
  if (value instanceof Response) {
    return value;
  }
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

const routeResponse = async (
  target: string | undefined,
  fragments: fragment[],
  partials: fragment[],
  ctx: ctx,
) => {
  const deferred: unknown[] = partials
    .map((fragment) => fragment.mod.partial?.(ctx))
    .filter((d) => d !== undefined && d !== null);

  const loaders = await Promise.all(
    fragments.map((fragment) => fragment.mod.loader?.(ctx)),
  );

  const initHeaders = new Headers();
  initHeaders.set("content-type", "text/html");

  if (target) {
    initHeaders.set("hx-retarget", `[data-children="${target}"]`);
    initHeaders.set("hx-reswap", "outerHTML");
  }

  const headers = await loadAllHeaders(initHeaders, ctx, fragments, loaders);

  const write = async () => {
    let html = target === undefined ? "<!doctype html>" : "";
    const node = fragments.reduceRight(
      async (curr, next, i) => {
        const loaderData = loaders[i];
        const parent =
          fragments[i - 1]?.id ?? partials[partials.length - 1]?.id;
        const Component = next.mod.default;
        let t = await (Component?.({ loaderData, children: curr }) ?? curr);
        if (typeof t === "string") {
          return into(t);
        }

        if (parent && typeof t.text[0] === "string") {
          t.text = t.text.replace(/^(<[a-z]+)/, `$1 data-children="${parent}"`);
        }
        return t;
      },
      Promise.resolve(into("")),
    );

    html += (await node)?.toString();

    if (deferred.length > 0) {
      html += `<template hx-swap="none">`;

      for await (const value of deferred) {
        html += value;
      }

      html += `</template>`;
    }
    return html;
  };

  return new Response(await write(), {
    headers,
    status: 200,
  });
};

const findDiffIndex = (
  current: { params: Record<string, string>; fragments: fragment[] },
  next: { params: Record<string, string>; fragments: fragment[] },
) => {
  for (let index = 0; index < next.fragments.length; index++) {
    const c = current.fragments[index];
    const n = next.fragments[index];
    if (!c) {
      return index;
    }

    if (!n) {
      return -1;
    }

    if (c.id !== n.id) {
      return index;
    }

    if (
      n.params?.some((param) => current.params[param] !== next.params[param])
    ) {
      return index;
    }
  }
  return -1;
};

const loadAllHeaders = async (
  init: Headers,
  ctx: ctx,
  fragments: fragment[],
  loaders: (Promise<unknown> | undefined)[],
) => {
  let headerTask = Promise.resolve(init);
  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];
    const loaderData = loaders[i];
    const chain = async (headers: Headers) => {
      const copy = new Headers(headers);
      const extraHeaders = await fragment.mod.headers?.({
        ...ctx,
        loaderData,
        headers: copy,
      });
      if (!extraHeaders) {
        return copy;
      }

      return copy;
    };
    headerTask = headerTask.then(chain);
  }
  return headerTask;
};
