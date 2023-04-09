import { createSelector } from "reselect";

import { GlobalState } from "@/store";

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

const fetchCurrentUserOverview = createSelector(
  (state: GlobalState) => state.entities.currentUser,
  (state: GlobalState) => state.entities.overviews,
  (currentUser, overviews) => {
    if (currentUser && currentUser.overviewIds && overviews) {
      return overviews[currentUser.overviewIds[0]];
    }
  }
);
export function useFetchCurrentUserOverview() {
  return useAppSelector(fetchCurrentUserOverview);
}

const fetchOverviewGroups = createSelector(
  (state: GlobalState) => state.entities.currentUser,
  (state: GlobalState) => state.entities.overviews,
  (state: GlobalState) => state.entities.overviewGroups,
  (currentUser, overviews, overviewGroups) => {
    if (currentUser && currentUser.overviewIds && overviews && overviewGroups) {
      const overview = overviews[currentUser.overviewIds[0]];
      if (overview.overviewGroupIds && overview.overviewGroupIds.length > 0) {
        return overview.overviewGroupIds.map((overviewGroupId: number) => {
          return overviewGroups[overviewGroupId];
        });
      }
    }
  }
);
export function useFetchOverviewGroups() {
  return useAppSelector(fetchOverviewGroups);
}

const fetchOverviewGroup = createSelector(
  (state: GlobalState) => state.entities.overviewGroups,
  (state: GlobalState, overviewGroupId: number) => overviewGroupId,
  (overviewGroups, overviewGroupId) => {
    if (overviewGroups) return overviewGroups[overviewGroupId];
  }
);
export function useFetchOverviewGroup(overviewGroupId: number) {
  return useAppSelector((state) => fetchOverviewGroup(state, overviewGroupId));
}

const fetchOverviewGroupPurchases = createSelector(
  (state: GlobalState) => state.entities.overviewGroups,
  (state: GlobalState, overviewGroupId: number) => overviewGroupId,
  (state: GlobalState) => state.entities.purchases,
  (overviewGroups, overviewGroupId, purchases) => {
    if (overviewGroups && purchases) {
      const overviewGroup = overviewGroups[overviewGroupId];
      if (overviewGroup.purchaseIds) {
        return overviewGroup.purchaseIds.map((purchaseId: number) => {
          return purchases[purchaseId];
        });
      }
    }
  }
);
export function useFetchOverviewGroupPurchases(overviewGroupId: number) {
  return useAppSelector((state) =>
    fetchOverviewGroupPurchases(state, overviewGroupId)
  );
}

const fetchPurchase = createSelector(
  (state: GlobalState) => state.entities.purchases,
  (state: GlobalState, purchaseId: number) => purchaseId,
  (purchases, purchaseId) => {
    if (purchases) return purchases[purchaseId];
  }
);
export function useFetchPurchase(purchaseId: number) {
  return useAppSelector((state) => fetchPurchase(state, purchaseId));
}
