import { authenticate, register } from "@packages/passkey";

const challengeUri = "/auth/challenge";
const registerForm = document.getElementById("register-form");
const registerButton = registerForm?.querySelector("button");
const registerToken = registerForm?.querySelector("input[name=token]");
const registerUsername = registerForm?.querySelector("input[name=username]");

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
    const token = await register(challengeUri, registerUsername.value);
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
  const token = await authenticate(challengeUri);
  verifyToken.value = token;
  verifyForm.requestSubmit();
});
