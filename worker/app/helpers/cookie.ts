import cookie from "cookie";
import { hmac } from "./crypto";

export const createCookie = (name: string, secret: string) => {
  return {
    serialize: async (value: unknown) => {
      const encodedValue = btoa(JSON.stringify(value));
      const signature = btoa(await hmac(secret, encodedValue));
      const signed = `${encodedValue}.${signature}`;
      return cookie.serialize(name, signed, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    },
    parse: async <T>(value: string) => {
      const { [name]: parsed } = cookie.parse(value);
      if (!parsed) {
        return null;
      }
      const [encodedValue, signature] = value.split(".");
      if (!encodedValue || !signature) {
        return null;
      }

      if (signature !== btoa(await hmac(secret, encodedValue))) {
        return null;
      }

      return JSON.parse(atob(encodedValue)) as T;
    },
  };
};
