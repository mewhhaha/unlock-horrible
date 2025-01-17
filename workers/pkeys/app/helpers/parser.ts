import { decodeJwt, decodeTrimmedBase64, jwtTime } from "@packages/jwt";
import { type } from "arktype";

export const parseVisitorHeaders = type({
  "city?": "string | undefined",
  "country?": "string | undefined",
  "continent?": "string | undefined",
  "longitude?": "string | undefined",
  "latitude?": "string | undefined",
  "region?": "string | undefined",
  "regionCode?": "string | undefined",
  "metroCode?": "string | undefined",
  "postalCode?": "string | undefined",
  "timezone?": "string | undefined",
});

const inferredVisitorHeaders = parseVisitorHeaders.infer;
export type VisitedHeaders = typeof inferredVisitorHeaders;

export const parseCredential = type({
  id: "string",
  publicKey: "string",
  algorithm: "'RS256' | 'ES256'",
});

export type Credential = typeof parseCredential.infer;

export const parseRegistrationEncoded = type({
  username: "string",
  credential: parseCredential,
  authenticatorData: "string",
  clientData: "string",
  "attestationData?": "string",
});

export type RegistrationEncoded = typeof parseRegistrationEncoded.infer;

export const parseRegistrationParsed = type({
  username: "string",
  credential: parseCredential,
  authenticator: {
    rpIdHash: "string",
    flags: {
      userPresent: "boolean",
      userVerified: "boolean",
      backupEligibility: "boolean",
      backupState: "boolean",
      attestedData: "boolean",
      extensionsIncluded: "boolean",
    },
    counter: "number",
    aaguid: "string",
    "name?": "string",
  },
  client: {
    type: "'webauthn.create' | 'webauthn.get'",
    challenge: "string",
    origin: "string",
    crossOrigin: "boolean",
    "tokenBindingId?": {
      id: "string",
      status: "string",
    },
    "extensions?": "unknown",
  },
  "attestation?": "unknown",
});

export type RegistrationParsed = typeof parseRegistrationParsed.infer;

export const parseAuthenticationEncoded = type({
  credentialId: "string",
  authenticatorData: "string",
  clientData: "string",
  signature: "string",
});

export type AuthenticationEncoded = typeof parseAuthenticationEncoded.infer;

export const parsedBoolean = type([
  "'true'|'false'",
  "=>",
  (s: string): boolean => {
    if (s === "true") return true;
    if (s === "false") return false;
    throw new Error("invalid boolean");
  },
]);

export const parseAuthenticationToken = async (
  token: string,
  { secret }: { secret: string },
) => {
  const [tokenRaw, signinRaw] = token.split("#");
  const { claim, message } = await parseClaim<{ vis: VisitedHeaders }>(
    secret,
    tokenRaw,
  );
  if (claim === undefined) {
    return { message };
  }

  const authentication = parseAuthenticationEncoded(
    JSON.parse(decodeTrimmedBase64(signinRaw)),
  );
  if (authentication instanceof type.errors) {
    return { message: "token_invalid" } as const;
  }

  return { authentication, visited: claim.vis, challengeId: claim.jti };
};

export const parseRegistrationToken = async (
  token: string,
  { secret }: { secret: string },
) => {
  const [tokenRaw, registrationRaw] = token.split("#");
  if (tokenRaw === undefined || registrationRaw === undefined) {
    return { message: "token_invalid" } as const;
  }

  const { claim, message } = await parseClaim<{ vis: VisitedHeaders }>(
    secret,
    tokenRaw,
  );
  if (claim === undefined) {
    return { message } as const;
  }

  const registrationEncoded = parseRegistrationEncoded(
    JSON.parse(decodeTrimmedBase64(registrationRaw)),
  );
  if (registrationEncoded instanceof type.errors) {
    return { message: "token_invalid" } as const;
  }

  return { registration: registrationEncoded, claim };
};

export const parseClaim = async <T extends Record<string, unknown>>(
  secret: string,
  token: string,
  aud?: string,
) => {
  const claim = await decodeJwt<T>(secret, token);
  if (claim === undefined) {
    return { message: "token_invalid" } as const;
  }

  if (jwtTime(new Date()) >= claim.exp) {
    return { message: "token_expired" } as const;
  }

  if (aud !== undefined && claim.aud !== aud) {
    return { message: "audience_mismatch" } as const;
  }

  return { claim } as const;
};
