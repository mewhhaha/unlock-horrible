import cookieSignature from "cookie-signature";
import cookie from "cookie";

export const createCookie = (name: string, secret: string) => {
  return {
    serialize: (value: unknown) => {
      const signed = cookieSignature.sign(JSON.stringify(value), secret);
      return cookie.serialize(name, signed, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    },
    parse: <T>(value: string) => {
      const { [name]: parsed } = cookie.parse(value);
      if (!parsed) {
        return null;
      }
      const unsigned = cookieSignature.unsign(parsed, secret);
      if (!unsigned) {
        return null;
      }
      return JSON.parse(unsigned) as T;
    },
  };
};
