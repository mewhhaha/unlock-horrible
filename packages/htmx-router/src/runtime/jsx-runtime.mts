import { into, isHtml, type Html } from "./node.mts";
import "./typed.mts";
import type { JSX } from "./typed.mts";
export type * from "./typed.mts";
export { type JSX } from "./jsx.mts";

export const Fragment = (props: any): any => jsx("", props);

export function jsx(
  tag: string | Function,
  { children, ...props }: { children?: unknown } & Record<string, any>,
): Promise<Html> {
  if (typeof tag === "function") {
    return tag({ children, ...props });
  }

  let attrs = "";
  for (const key in props) {
    let value = props[key];

    const sanitized = sanitize(value);
    if (sanitized === undefined) {
      continue;
    }
    attrs += ` ${key}="${sanitized}" `;
  }

  const f = async (): Promise<Html> => {
    let html = "";
    if (tag) {
      html += `<${tag}${attrs}>`;
    }

    const rec = async (child: unknown) => {
      if (child === undefined || child === null || child === false) {
        return;
      }
      if (isHtml(child)) {
        html += child.text;
        return;
      }
      if (Array.isArray(child)) {
        for (let i = 0; i < child.length; i++) {
          const c = child[i];

          await rec(c);
        }
        return;
      }
      if (isPromise(child)) {
        await rec(await child);
        return;
      }
      if (typeof child === "function") {
        await rec(child());
        return;
      }

      html += escapeHtml(child.toString());
    };

    await rec(children);

    if (tag) {
      html += `</${tag}>`;
    }

    return into(html);
  };

  return f();
}

export function escapeHtml(input: string): string {
  return input.replaceAll(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

const sanitize = (value: any) => {
  if (typeof value === "string") {
    return value.replaceAll(/"/g, "&quot;");
  }
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "boolean") {
    return value.toString();
  }
};

export function jsxs(tag: any, props: any): JSX.Element {
  return jsx(tag, props);
}

const isPromise = (value: unknown): value is Promise<string> =>
  typeof value === "object" && value !== null && "then" in value;
