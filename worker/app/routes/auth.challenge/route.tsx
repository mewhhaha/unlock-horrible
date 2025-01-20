import * as t from "./+types.route";
import { hmac, encodeTrimmedBase64 } from "@packages/jwt";

export const action = async ({
  request,
  context: [env, ctx],
}: t.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const id = challenge();

  const token = `${id}.${encodeTrimmedBase64(await hmac(env.SECRET_KEY, id))}`;

  ctx.waitUntil(save(request, id));

  return new Response(token, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
};

const challenge = () => {
  return encodeTrimmedBase64(crypto.randomUUID());
};

const save = async (request: Request, id: string) => {
  const cache = await caches.open("challenge");
  const url = new URL(`/${id}`, new URL(request.url).origin);
  const key = new Request(url, {
    headers: { "Cache-Control": "max-age=3600" },
  });
  const value = new Response(id);
  await cache.put(key, value);
};

export const finish = async (request: Request, id: string) => {
  const url = new URL(`/${id}`, new URL(request.url).origin);
  const key = new Request(url);
  const cache = await caches.open("challenge");
  const valid = null !== (await cache.match(key));

  if (valid) {
    await cache.delete(key);
  }

  return valid;
};
