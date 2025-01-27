import type * as t from "./+types.root";

const htmxUrl = new URL("./assets/htmx.js", import.meta.url);
const idiomorphUrl = new URL("./assets/idiomorph.js", import.meta.url);
const idiomorphHtmxUrl = new URL("./assets/idiomorph-htmx.js", import.meta.url);
const stylesUrl = new URL("./assets/tailwind.css", import.meta.url);

export const headers = ({ headers }: t.HeadersArgs) => {
  headers.set("strict-transport-security", "max-age=31536000");
};

export default function Document({
  children,
}: {
  children?: string | undefined;
}) {
  return (
    <html>
      <head>
        <title>Unlock example</title>
        <meta charset="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
        <script src={htmxUrl.pathname}></script>
        <script src={idiomorphUrl.pathname}></script>
        <script src={idiomorphHtmxUrl.pathname}></script>
        <link rel="stylesheet" href={stylesUrl.pathname} />
        <script type="module">{`console.debug = function(){}`}</script>
      </head>
      <body class={`bg-slate-900`} hx-boost="true" hx-ext="morph">
        {children}
      </body>
    </html>
  );
}
