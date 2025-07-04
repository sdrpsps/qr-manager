import { useQueryState } from "nuqs";

export const useDeleteState = () => {
  return useQueryState("deleteId", {
    defaultValue: "",
    clearOnDefault: true,
  });
};
