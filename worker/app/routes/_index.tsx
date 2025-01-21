import { replace } from "../helpers/responses";

export const loader = () => {
  throw replace("/home");
};
