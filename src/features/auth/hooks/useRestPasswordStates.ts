import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

export const useRestPasswordStates = () => {
  return useQueryStates({
    resetPasswordOpen: parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
    token: parseAsString.withDefault(""),
  });
};
