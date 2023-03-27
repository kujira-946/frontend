import { useSelector } from "react-redux";

import { GlobalState } from "@/store";

export function useUiSlice() {
  return useSelector((state: GlobalState) => state.ui);
}

export function useEntitiesSlice() {
  return useSelector((state: GlobalState) => state.entities);
}

export function useErrorsSlice() {
  return useSelector((state: GlobalState) => state.errors);
}
