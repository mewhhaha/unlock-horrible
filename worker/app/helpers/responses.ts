import type { JSX } from "@mewhhaha/htmx-router/jsx-runtime";

export const redirect = (
  location: string,
  {
    headers: incoming,
    status,
    htmx = false,
    ...init
  }: ResponseInit & { htmx?: boolean } = {},
): Response => {
  const headers = mergeHeaders(incoming, new Headers());
  if (htmx) {
    headers.set("HX-Location", location);
    headers.set("HX-Push-Url", location);
    status ??= 200;
  } else {
    headers.set("Location", location);
    status ??= 302;
  }

  return new Response(null, {
    status,
    headers,
    ...init,
  });
};

export const replace = (
  location: string,
  {
    headers: incoming,
    status,
    htmx = false,
    ...init
  }: ResponseInit & { htmx?: boolean } = {},
): Response => {
  const headers = mergeHeaders(incoming, new Headers());
  if (htmx) {
    headers.set("HX-Location", location);
    headers.set("HX-Replace-Url", location);
    status ??= 200;
  } else {
    headers.set("Location", location);
    status ??= 302;
  }

  return new Response(null, {
    status,
    headers,
    ...init,
  });
};

const mergeHeaders = (incoming: HeadersInit | undefined, headers: Headers) => {
  if (!incoming) {
    return headers;
  }

  if (Array.isArray(incoming)) {
    for (const [key, value] of incoming) {
      headers.set(key, value);
    }
  } else if (incoming instanceof Headers) {
    for (const [key, value] of incoming.entries()) {
      headers.set(key, value);
    }
  } else {
    for (const key in incoming) {
      headers.set(key, incoming[key]);
    }
  }

  return headers;
};

export const htmx = async (
  body: JSX.SingleElement,
  { headers: incoming, status = 200 }: ResponseInit = {},
): Promise<Response> => {
  const headers = mergeHeaders(incoming, new Headers());
  headers.set("Content-Type", "text/html");

  return new Response(await body, {
    status,
    headers,
  });
};
