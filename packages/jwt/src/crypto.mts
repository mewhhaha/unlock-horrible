const encoder = new TextEncoder();

export const hmac = async (
  secretKey: string,
  message: string,
  { hash = "SHA-256" }: { hash?: string } = {},
): Promise<string> => {
  const secretKeyData = encoder.encode(secretKey);
  const key = await crypto.subtle.importKey(
    "raw",
    secretKeyData,
    { name: "HMAC", hash: { name: hash } },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message),
  );

  return [...new Uint8Array(signature)]
    .map((b) => String.fromCharCode(b))
    .join("");
};

const dash = /-/g;
const underscore = /_/g;
const plus = /\+/g;
const slash = /\//g;
const equals = /=+$/;

/** Decodes the trimmed base64 encoded string */
export const decodeTrimmedBase64 = (str: string): string => {
  str = str.replace(dash, "+").replace(underscore, "/");
  while (str.length % 4) {
    str += "=";
  }
  return atob(str);
};

/** Encodes a string as trimmed base64 encoding that can be used in a jwt for example */
export const encodeTrimmedBase64 = (str: string): string => {
  const base64 = btoa(str);
  return base64.replace(plus, "-").replace(slash, "_").replace(equals, "");
};

// export const encode = async (salt: string, value: string): Promise<string> => {
//   const encodedValue = encodeTrimmedBase64(value);
//   const hash = await hmac(salt, encodedValue);

//   return `${encodedValue}.${encodeTrimmedBase64(hash)}`;
// };

// export const decode = async (
//   salt: string,
//   jwt: string,
// ): Promise<string | undefined> => {
//   const [encodedClaim, encodedHash] = jwt.split(".");
//   if (encodedClaim === undefined || encodedHash === undefined) {
//     return undefined;
//   }

//   if (encodeTrimmedBase64(await hmac(salt, encodedClaim)) !== encodedHash) {
//     return undefined;
//   }

//   return decodeTrimmedBase64(encodedClaim);
// };

// export const jwtTime = (date: Date): number => (date.getTime() / 1000) | 0;
// export const jwtDate = (num: number): Date => new Date(num * 1000);
