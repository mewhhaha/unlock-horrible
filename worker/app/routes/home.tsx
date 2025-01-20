export default function Home() {
  // Fake value
  let create: (value: string) => {
    register: (username: string) => Promise<string>;
    authenticate: () => Promise<string>;
  };

  return (
    <div>
      <script type="module">
        {`import { create } from "/passkey.mjs";`}
        {f(async () => {
          const passkey = create("/auth/challenge");

          const registerForm = document.getElementById("register-form");
          const registerButton = registerForm?.querySelector("button");
          const registerToken =
            registerForm?.querySelector("input[name=token]");
          const registerUsername = registerForm?.querySelector(
            "input[name=username]",
          );
          if (!(registerForm instanceof HTMLFormElement)) {
            throw new Error('Missing form with id "register-form"');
          }
          if (!(registerButton instanceof HTMLButtonElement)) {
            throw new Error("Missing button");
          }
          if (!(registerUsername instanceof HTMLInputElement)) {
            throw new Error("Missing username input");
          }
          if (!(registerToken instanceof HTMLInputElement)) {
            throw new Error("Missing token input");
          }

          registerButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const valid = registerForm.reportValidity();
            if (valid) {
              const token = await passkey.register(registerUsername.value);
              registerToken.value = token;
              registerForm.requestSubmit();
            }
          });

          const verifyForm = document.getElementById("verify-form");
          const verifyButton = verifyForm?.querySelector("button");
          const verifyToken = verifyForm?.querySelector("input[name=token]");
          if (!(verifyForm instanceof HTMLFormElement)) {
            throw new Error('Missing form with id "register-form"');
          }
          if (!(verifyButton instanceof HTMLButtonElement)) {
            throw new Error("Missing button");
          }
          if (!(verifyToken instanceof HTMLInputElement)) {
            throw new Error("Missing username input");
          }
          verifyButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const token = await passkey.authenticate();
            verifyToken.value = token;
            verifyForm.requestSubmit();
          });
        })}
      </script>
      <header>
        <h1 class={`mb-10 text-center font-serif text-xl text-white`}>
          Unlock example
        </h1>
      </header>

      <main
        class={`
          mx-auto flex w-full max-w-md flex-col gap-2 rounded border-2 bg-slate-800 p-4 text-white
          shadow-sm shadow-white/50
        `}
      >
        <form id="register-form" method="POST" action="/auth/register">
          <input name="token" type="hidden" />
          <div>
            I am
            <input
              required
              name="username"
              type="text"
              minlength="3"
              placeholder="e.g. Zapato"
              class={`
                mx-2 w-24 border-b bg-slate-700 px-1 text-white

                invalid:border-b-red-600
              `}
            />
            and I want to&nbsp;
            <button class={`cursor-pointer underline`}>register</button>
          </div>
        </form>

        <form id="verify-form" method="POST" action="/auth/verify">
          <input name="token" type="hidden" />
          <div>
            I want to&nbsp;
            <button class={`cursor-pointer underline`}>unlock</button>
          </div>
        </form>
      </main>
    </div>
  );
}

const f = <T extends unknown[]>(fn: (...args: T) => void, ...args: T) => {
  const fnString = fn.toString();

  if (args.length === 0) {
    return `
(${fnString})();
`.trim();
  }

  return `
const values = JSON.parse("${JSON.stringify(args).replace('"', '\\"')}");
  
await (${fnString})(...values); 
  `.trim();
};
