import { parseAsBoolean, useQueryState } from "nuqs";

export const useLogoutState = () => {
  return useQueryState("logoutOpen", parseAsBoolean.withDefault(false));
};
