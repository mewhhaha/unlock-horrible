import { decodeTrimmedBase64, encodeTrimmedBase64, hmac } from "./crypto.mjs";
export * from "./crypto.mjs";

type JwtClaim<T = Record<never, never>> = {
  jti: string;
  sub: string;
  iat: number;
  exp: number;
  aud: string;
} & T;

export const encodeJwt = async <
  T extends Record<any, any> = Record<never, never>,
>(
  salt: string,
  payload: Omit<JwtClaim<T>, "iat">,
): Promise<string> => {
  const header = encodeTrimmedBase64(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  );
  const claim = encodeTrimmedBase64(
    JSON.stringify({
      iat: jwtTime(new Date()),
      ...payload,
    }),
  );

  const hash = await hmac(salt, `${header}.${claim}`);

  return `${header}.${claim}.${encodeTrimmedBase64(hash)}`;
};

export const decodeJwt = async <
  T extends Record<any, any> = Record<never, never>,
>(
  salt: string,
  jwt: string,
): Promise<JwtClaim<T> | undefined> => {
  const [encodedHeader, encodedClaim, encodedHash] = jwt.split(".");
  if (
    encodedHeader === undefined ||
    encodedClaim === undefined ||
    encodedHash === undefined
  ) {
    return undefined;
  }

  if (
    encodeTrimmedBase64(
      await hmac(salt, `${encodedHeader}.${encodedClaim}`),
    ) !== encodedHash
  ) {
    return undefined;
  }

  return JSON.parse(decodeTrimmedBase64(encodedClaim)) as JwtClaim<T>;
};

export const createAuthorization = (jwt: string) => {
  return `Bearer ${jwt}`;
};

export const parseJwt = (authorization: string): string | undefined => {
  const groups = authorization.match(/^Bearer (?<jwt>.+)$/)?.groups;
  const jwt = groups?.jwt;

  if (!jwt) {
    return undefined;
  }

  return jwt;
};

export const jwtTime = (date: Date): number => (date.getTime() / 1000) | 0;
export const jwtDate = (num: number): Date => new Date(num * 1000);
