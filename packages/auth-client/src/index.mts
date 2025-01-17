import { client } from "@passwordless-id/webauthn";
import { encodeTrimmedBase64 } from "@packages/jwt";

export default function Client() {
  let controller: AbortController;

  const signin = async () => {
    controller?.abort();
    controller = new AbortController();

    try {
      const response = await fetch(`/auth/challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        return {
          success: false,
          reason: await response.json().then((r) => r.message),
        } as const;
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

      return { success: true, token: signinToken } as const;
    } catch (e) {
      console.error(e);
      return {
        success: false,
        reason: "signin_aborted",
      } as const;
    }
  };

  const register = async (username: string) => {
    controller?.abort();
    controller = new AbortController();

    try {
      const response = await fetch(`/auth/challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        return {
          success: false,
          reason: await response.json().then((r) => r.message),
        } as const;
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

      return { success: true, token: registrationToken } as const;
    } catch (e) {
      console.error(e);
      return {
        success: false,
        reason: "register_aborted",
      } as const;
    }
  };

  return {
    signin,
    register,
  };
}

export type Client = ReturnType<typeof Client>;
