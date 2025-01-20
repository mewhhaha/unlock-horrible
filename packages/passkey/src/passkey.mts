import { client } from "@passwordless-id/webauthn";
import { encodeTrimmedBase64 } from "@packages/jwt";

const create = (
  challengeUri: string,
): {
  register: (username: string) => Promise<string>;
  authenticate: () => Promise<string>;
} => {
  let controller: AbortController;

  const authenticate = async (): Promise<string> => {
    controller?.abort();
    controller = new AbortController();

    const response = await fetch(challengeUri, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const token = await response.text();

    const [challenge] = token.split(".");

    const authentication = await client.authenticate({
      challenge,
      userVerification: "required",
    });

    const signinToken = `${token}.${encodeTrimmedBase64(
      JSON.stringify(authentication),
    )}`;

    return signinToken;
  };

  const register = async (username: string): Promise<string> => {
    controller?.abort();
    controller = new AbortController();

    const response = await fetch(challengeUri, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const token = await response.text();

    const [challenge] = token.split(".");

    const registration = await client.register({
      user: username,
      challenge,
      userVerification: "required",
      discoverable: "required",
    });

    const registrationToken = `${token}.${encodeTrimmedBase64(
      JSON.stringify(registration),
    )}`;

    return registrationToken;
  };

  return { register, authenticate };
};

export { create };
