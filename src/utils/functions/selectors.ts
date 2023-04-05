import { createSelector } from "reselect";

import { GlobalState } from "@/store";

import { useAppSelector } from "./hooks";
import { useContext } from "react";
import { SignalsStoreContext } from "@/pages/_app";

export function useSignalsStore() {
  return useContext(SignalsStoreContext);
}

export function useUiSlice() {
  return useAppSelector((state) => state.ui);
}

export function useEntitiesSlice() {
  return useAppSelector((state) => state.entities);
}

export function useErrorsSlice() {
  return useAppSelector((state) => state.errors);
}

export const fetchOverviewGroups = createSelector(
  (state: GlobalState) => state.entities.overviews,
  (state: GlobalState) => state.entities.overviewGroups,
  (overviews, overviewGroups) => {
    if (overviews && overviewGroups) {
      const overview = Object.values(overviews)[0];
      return overview.overviewGroupIds.map((overviewGroupId: number) => {
        return overviewGroups[overviewGroupId];
      });
    }
  }
);
