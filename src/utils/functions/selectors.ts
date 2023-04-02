import { useAppSelector } from "./hooks";

export function useUiSlice() {
  return useAppSelector((state) => state.ui);
}

export function useEntitiesSlice() {
  return useAppSelector((state) => state.entities);
}

export function useErrorsSlice() {
  return useAppSelector((state) => state.errors);
}
