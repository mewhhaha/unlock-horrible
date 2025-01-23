const client = new URL("./home.client.mjs", import.meta.url);

export default function Home() {
  return (
    <div>
      <script type="module" src={client.pathname}></script>
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
        <form
          id="register-form"
          method="POST"
          action="/auth/register"
          hx-push-url="false"
        >
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
        <p id="error"></p>
      </main>
    </div>
  );
}
