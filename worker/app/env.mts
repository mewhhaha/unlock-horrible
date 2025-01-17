import type { DurableObjectChallenge } from "./objects/challenge";
import type { DurableObjectPasskey } from "./objects/passkey";
import type { DurableObjectUser } from "./objects/user";

export interface Env {
  OBJECT_CHALLENGE: DurableObjectNamespace<DurableObjectChallenge>;
  OBJECT_PASSKEY: DurableObjectNamespace<DurableObjectPasskey>;
  OBJECT_USER: DurableObjectNamespace<DurableObjectUser>;
  AUDIENCE: string;
  SECRET_KEY: string;
  AUTH_KEY: string;
  ORIGIN: string;
}
declare module "@mewhhaha/htmx-router" {
  interface Env {
    OBJECT_CHALLENGE: DurableObjectNamespace<DurableObjectChallenge>;
    OBJECT_PASSKEY: DurableObjectNamespace<DurableObjectPasskey>;
    OBJECT_USER: DurableObjectNamespace<DurableObjectUser>;
    AUDIENCE: string;
    AUTH_KEY: string;
    SECRET_KEY: string;
    ORIGIN: string;
  }
}
