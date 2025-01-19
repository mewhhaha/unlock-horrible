import "./typed.mts";
export type * from "./typed.mts";
export { type JSX } from "./jsx.mts";

export const Fragment = (props: any): any => jsx("", props);

export function jsx(
  tag: string | Function,
  { children, ...props }: { children?: unknown } & Record<string, any>,
): any {
  if (typeof tag === "function") {
    return tag({ children, ...props });
  }

  let attrs = "";
  for (const key in props) {
    let value = props[key];

    if (typeof value === "function" && key.match(/^on[A-Z]/)) {
      value = `(${value.toString()})`;
      if (value.includes("this")) {
        value = value + ".bind(this)";
      }
      value = value + "(event)";
    }

    const sanitized = sanitize(value);
    if (sanitized === undefined) {
      continue;
    }
    attrs += ` ${key}="${sanitized}" `;
  }

  const f = async (): Promise<string> => {
    let html = "";
    if (tag) {
      html = `<${tag}${attrs}>`;
    }

    const rec = async (child: unknown) => {
      if (child === undefined || child === null || child === false) {
        return;
      }
      if (Array.isArray(child)) {
        for (const c of child) {
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

      html += child.toString();
    };

    await rec(children);

    if (tag) {
      html += `</${tag}>`;
    }

    return html;
  };

  return f();
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

export function jsxs(tag: any, props: any): Element {
  return jsx(tag, props);
}

const isPromise = (value: unknown): value is Promise<string> =>
  typeof value === "object" && value !== null && "then" in value;
