import { redirect } from "@mewhhaha/htmx-router";
import { parseVisitorHeaders } from "../../helpers/parser.js";
import type * as t from "./+types.route.js";
import { createCookie } from "../../helpers/cookie.js";
import { decodeTrimmedBase64, hmac } from "@packages/jwt";
import { type } from "arktype";
import type { AuthenticationJSON } from "@passwordless-id/webauthn/dist/esm/types.js";

export const action = async ({ request, context: [env] }: t.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const visitorHeaders = parseVisitorHeaders(
    Object.fromEntries(request.headers.entries()),
  );
  if (visitorHeaders instanceof type.errors) {
    // Not sure this can happen
    return new Response("visitor_headers_invalid", { status: 403 });
  }

  const formData = await request.formData();
  const token = formData.get("token")?.toString();
  if (!token) {
    return new Response("token_missing", { status: 403 });
  }

  const [challengeBase64, signature, authenticationBase64Json] =
    token.split(".");
  if (
    challengeBase64 === undefined ||
    signature === undefined ||
    authenticationBase64Json === undefined
  ) {
    return new Response("token_invalid", { status: 403 });
  }

  if (signature !== (await hmac(env.SECRET_KEY, challengeBase64))) {
    return new Response("signature_invalid", { status: 403 });
  }

  const challengeId = decodeTrimmedBase64(challengeBase64);
  const authenticationJson = decodeTrimmedBase64(authenticationBase64Json);

  const authentication = JSON.parse(authenticationJson) as AuthenticationJSON;
  const challenge = env.OBJECT_CHALLENGE.get(
    env.OBJECT_CHALLENGE.idFromString(challengeId),
  );
  const finished = await challenge.finish();
  if (finished.error) {
    return new Response(finished.message, { status: 403 });
  }

  const passkey = env.OBJECT_PASSKEY.get(
    env.OBJECT_PASSKEY.idFromName(authentication.id),
  );

  const payload = {
    challengeId,
    visited: visitorHeaders,
    json: authentication,
  };
  const authenticated = await passkey.authenticate(payload);
  if (authenticated.error) {
    return new Response(authenticated.message, { status: 403 });
  }

  const { userId, passkeyId } = authenticated.data;

  const cookie = createCookie("user", env.SECRET_KEY);

  return redirect("/me", {
    headers: {
      "Set-Cookie": cookie.serialize({ userId, passkeyId }),
    },
  });
};
