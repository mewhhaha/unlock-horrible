import { DurableObject } from "cloudflare:workers";

type Start = {
  ms: number;
  code?: string;
  value?: string;
};

export class DurableObjectChallenge extends DurableObject {
  private valid: boolean = false;
  private code: string | undefined = undefined;
  private value: string = "";

  constructor(state: DurableObjectState, env: unknown) {
    super(state, env);
    void state.blockConcurrencyWhile(async () => {
      const load = async (key: "valid" | "code" | "value") => {
        const value = await this.ctx.storage.get(key);
        if (value !== undefined) {
          // @ts-expect-error we can't see private variables
          this[key] = value;
        }
      };
      await Promise.all([load("valid"), load("code"), load("value")]);
    });
  }

  async start({ ms, code, value }: Start) {
    this.valid = true;
    this.ctx.storage.put("valid", true);

    if (code !== undefined) {
      this.code = code;
      this.ctx.storage.put("code", code);
    }
    if (value !== undefined) {
      this.value = value;
      this.ctx.storage.put("value", value);
    }

    const expiry = new Date(Date.now() + ms);
    void this.ctx.storage.setAlarm(expiry);
  }

  async finish(code?: string) {
    if (!this.valid) {
      return { error: true, message: "challenge_expired" } as const;
    }

    this.valid = false;
    void this.ctx.storage.deleteAll();
    void this.ctx.storage.deleteAlarm();

    if (this.code !== undefined && this.code !== code) {
      return { error: true, message: "code_mismatch" } as const;
    }

    return { error: false, data: this.value } as const;
  }

  async alarm() {
    this.valid = false;
    await this.ctx.storage.deleteAll();
  }
}
