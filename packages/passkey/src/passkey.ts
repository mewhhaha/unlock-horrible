import { client } from "@passwordless-id/webauthn";

export const create = (
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

    const signinToken = `${token}.${btoa(JSON.stringify(authentication))}`;

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
      timeout: 60000,
      attestation: true,
    });

    const registrationToken = `${token}.${btoa(JSON.stringify(registration))}`;

    return registrationToken;
  };

  return { register, authenticate };
};
