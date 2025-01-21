import { createCookie } from "../helpers/cookie";
import { redirect } from "../helpers/responses";
import type * as t from "./+types.me";

export const loader = async ({ request, context: [env] }: t.LoaderArgs) => {
  const cookie = request.headers.get("Cookie") ?? "";
  const userCookie = createCookie("user", env.SECRET_KEY);
  const user = await userCookie.parse<{ userId: string; passkeyId: string }>(
    cookie,
  );
  if (!user) {
    throw redirect("/home");
  }

  return { user };
};

export default function Component({ loaderData: { user } }: t.ComponentProps) {
  return (
    <main class={`mx-auto max-w-md text-white`}>
      <dl>
        <dt>User ID</dt>
        <dd>{user?.userId}</dd>
        <dt>Passkey ID</dt>
        <dd>{user?.passkeyId}</dd>
      </dl>
    </main>
  );
}
