export default function Home() {
  // Fake value
  let create: (value: string) => {
    register: (username: string) => Promise<string>;
    signin: () => Promise<string>;
  };

  return (
    <div>
      <script type="module">
        {`import { create } from "/passq.mjs";`}
        {f(async () => {
          const passq = create("/auth/challenge");
          const signup = document.getElementById("signup");
          const signin = document.getElementById("signin");

          signup?.addEventListener("click", async () => {
            const token = await passq.register("username");
            htmx.ajax("post", "/auth/register", {
              values: { token },
              target: "body",
            });
          });

          signin?.addEventListener("click", async () => {
            const token = await passq.signin();
            htmx.ajax("post", "/auth/verify", {
              values: { token },
              target: "body",
            });
          });
        })}
      </script>
      <header>passq</header>

      <div class={`mx-auto flex w-full max-w-sm flex-col text-black`}>
        <h1 class={`text-2xl text-white`}>Passq</h1>
        <button
          id="signup"
          class={`
            cursor-pointer border-4 border-white px-4 py-2 font-bold text-white

            hover:border-pink-600 hover:bg-pink-200 hover:text-black
          `}
        >
          Register
        </button>
        <button
          id="signin"
          class={`
            cursor-pointer px-4 py-2 font-bold text-white

            hover:bg-pink-200 hover:text-black
          `}
        >
          Authenticate
        </button>
      </div>
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
