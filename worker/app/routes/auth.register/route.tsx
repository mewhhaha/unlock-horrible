import { makePasskeyLink } from "../../objects/user.js";
import { parseVisitorHeaders } from "../../helpers/parser.js";
import type * as t from "./+types.route.js";
import { redirect } from "@mewhhaha/htmx-router";
import { createCookie } from "../../helpers/cookie.js";
import { decodeTrimmedBase64, hmac } from "@packages/jwt";
import { type } from "arktype";
import type { RegistrationJSON } from "@passwordless-id/webauthn/dist/esm/types.js";

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

  const [challengeBase64, signature, registrationBase64Json] = token.split(".");
  if (
    challengeBase64 === undefined ||
    signature === undefined ||
    registrationBase64Json === undefined
  ) {
    return new Response("token_invalid", { status: 403 });
  }

  if (signature !== (await hmac(env.SECRET_KEY, challengeBase64))) {
    return new Response("signature_invalid", { status: 403 });
  }

  const challengeId = decodeTrimmedBase64(challengeBase64);
  const registrationJson = decodeTrimmedBase64(registrationBase64Json);

  const registration = JSON.parse(registrationJson) as RegistrationJSON;

  const challenge = env.OBJECT_CHALLENGE.get(
    env.OBJECT_CHALLENGE.idFromString(challengeId),
  );

  const finishedChallenge = await challenge.finish();
  if (finishedChallenge.error) {
    return new Response(finishedChallenge.message, { status: 403 });
  }
  try {
    const credentialId = registration.id;
    const passkey = env.OBJECT_PASSKEY.get(
      env.OBJECT_PASSKEY.idFromName(credentialId),
    );
    const user = env.OBJECT_USER.get(env.OBJECT_USER.newUniqueId());

    const data = {
      userId: user.id.toString(),
      json: registration,
      challengeId,
      visited: visitorHeaders,
    };

    const response = await passkey.register(data);

    if (response.error) {
      return new Response(response.message, { status: 403 });
    }

    const passkeyLink = makePasskeyLink({
      passkeyId: passkey.id,
      credentialId,
      userId: user.id,
    });

    try {
      await user.create({ username: "anonymous", passkey: passkeyLink });
    } catch {
      return new Response("user_exists", { status: 403 });
    }

    const cookie = createCookie("user", env.SECRET_KEY);

    return redirect("/me", {
      status: 200,
      headers: {
        "Set-Cookie": cookie.serialize({
          userId: user.id.toString(),
          passkeyId: passkey.id.toString(),
        }),
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("registration_failed", { status: 403 });
  }
};
