import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

export const useProfileStates = () => {
  return useQueryStates({
    profileOpen: parseAsBoolean
      .withDefault(false)
      .withOptions({ clearOnDefault: true }),
    profileMessage: parseAsString.withDefault(""),
  });
};
