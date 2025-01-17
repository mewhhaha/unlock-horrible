
import * as document from "./document.tsx";
import { type route } from "@mewhhaha/htmx-router";
import * as $_ from "./routes/$.tsx";
import * as $auth_challenge from "./routes/auth.challenge/route.tsx";
import * as $auth_register from "./routes/auth.register/route.tsx";
import * as $auth_verify from "./routes/auth.verify/route.tsx";
import * as $home from "./routes/home.tsx";
import * as $me from "./routes/me.tsx";
import * as $_index from "./routes/_index.tsx";
const $$auth_challenge = { id: "auth.challenge", mod: $auth_challenge };
const $$auth_register = { id: "auth.register", mod: $auth_register };
const $$auth_verify = { id: "auth.verify", mod: $auth_verify };
const $$home = { id: "home", mod: $home };
const $$me = { id: "me", mod: $me };
const $$_index = { id: "_index", mod: $_index };
const $$_ = { id: "$", mod: $_, params: [""] };
const $document = { id: "", mod: document };

export const routes: route[] = [["/auth/challenge", [$document,$$auth_challenge]],
["/auth/register", [$document,$$auth_register]],
["/auth/verify", [$document,$$auth_verify]],
["/home", [$document,$$home]],
["/me", [$document,$$me]],
["/", [$document,$$_index]],
["/:", [$document,$$_]]];
