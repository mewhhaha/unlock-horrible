import * as t from "./+types.route";
import { hmac, encodeTrimmedBase64 } from "@packages/jwt";

export const action = async ({
  request,
  context: [env, ctx],
}: t.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const id = env.OBJECT_CHALLENGE.newUniqueId();
  const encodedId = encodeTrimmedBase64(id.toString());

  const token = `${encodedId}.${await hmac(env.SECRET_KEY, encodedId)}`;

  const challenge = env.OBJECT_CHALLENGE.get(id);
  ctx.waitUntil(challenge.start({ ms: 60000 }));

  return new Response(token, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
};
