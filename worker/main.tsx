import type { Env } from "./app/env.mts";
import { routes } from "./app/routes.mjs";
import { Router } from "@mewhhaha/htmx-router";

export { DurableObjectPasskey } from "./app/objects/passkey";
export { DurableObjectUser } from "./app/objects/user";

const router = Router(routes);

const handler: ExportedHandler<Env> = {
  fetch: async (request, env, ctx) => {
    const response = await router.handle(request, env, ctx);
    if (response.headers.get("HX-Reswap")) {
      response.headers.set("HX-Reswap", "morph:outerHTML show:no-scroll");
    }
    return response;
  },
};

export default handler;
