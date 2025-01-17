export default function Home() {
  return (
    <div>
      <header>Passwordless login</header>
      <script type="module">
        {`
const pkeys = await import("/pkeys");
const client = pkeys.default();

const signup = document.getElementById("signup");
const signin = document.getElementById("signin");

signup.addEventListener("click", async () => {
  const { success, token } = await client.register("username");
  if (success) {
    htmx.ajax("POST", "/auth/register", {
      values: { token},
      target: "body"
    });
  }
});

signin.addEventListener("click", async () => {
  const { success, token } = await client.signin();
  if (success) {
    htmx.ajax("POST", "/auth/verify", {
        values: { token },
        target: "body"
    });
  }
});
`}
      </script>
      <button id="signup">Sign up</button>
      <button id="signin">Sign in</button>
    </div>
  );
}
