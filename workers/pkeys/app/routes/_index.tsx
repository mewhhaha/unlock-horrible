import { replace } from "@mewhhaha/htmx-router";

export const loader = () => {
  throw replace("/home");
};
