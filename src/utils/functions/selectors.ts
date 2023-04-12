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

const getCurrentUserOverview = createSelector(
  (state: GlobalState) => state.entities.currentUser,
  (state: GlobalState) => state.entities.overviews,
  (currentUser, overviews) => {
    if (currentUser && overviews) {
      return overviews[currentUser.overviewIds[0]];
    }
  }
);
export function useGetCurrentUserOverview() {
  return useAppSelector(getCurrentUserOverview);
}

const getCurrentUserOverviewGroups = createSelector(
  (state: GlobalState) => state.entities.currentUser,
  (state: GlobalState) => state.entities.overviews,
  (state: GlobalState) => state.entities.overviewGroups,
  (currentUser, overviews, overviewGroups) => {
    if (currentUser && overviews && overviewGroups) {
      const overview = overviews[currentUser.overviewIds[0]];
      if (overview.overviewGroupIds && overview.overviewGroupIds.length > 0) {
        return overview.overviewGroupIds.map((overviewGroupId: number) => {
          return overviewGroups[overviewGroupId];
        });
      }
    }
  }
);
export function useGetCurrentUserOverviewGroups() {
  return useAppSelector(getCurrentUserOverviewGroups);
}

const getCurrentUserLogbooks = createSelector(
  (state: GlobalState) => state.entities.currentUser,
  (state: GlobalState) => state.entities.logbooks,
  (currentUser, logbooks) => {
    if (currentUser && logbooks) {
      return currentUser.logbookIds.map((logbookId: number) => {
        return logbooks[logbookId];
      });
    }
  }
);
export function useGetCurrentUserLogbooks() {
  return useAppSelector(getCurrentUserLogbooks);
}

const getOverviewGroup = createSelector(
  (state: GlobalState) => state.entities.overviewGroups,
  (state: GlobalState, overviewGroupId: number) => overviewGroupId,
  (overviewGroups, overviewGroupId) => {
    if (overviewGroups) return overviewGroups[overviewGroupId];
  }
);
export function useGetOverviewGroup(overviewGroupId: number) {
  return useAppSelector((state) => getOverviewGroup(state, overviewGroupId));
}

const getOverviewGroupPurchases = createSelector(
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
export function useGetOverviewGroupPurchases(overviewGroupId: number) {
  return useAppSelector((state) =>
    getOverviewGroupPurchases(state, overviewGroupId)
  );
}

const getLogbookEntries = createSelector(
  (state: GlobalState) => state.entities.logbooks,
  (state: GlobalState, logbookId: number) => logbookId,
  (state: GlobalState) => state.entities.logbookEntries,
  (logbooks, logbookId, logbookEntries) => {
    if (logbooks && logbooks[logbookId] && logbookEntries) {
      const logbookEntryIds = logbooks[logbookId].logbookEntryIds;
      if (logbookEntryIds) {
        return logbookEntryIds.map((logbookEntryId: number) => {
          return logbookEntries[logbookEntryId];
        });
      }
    }
  }
);
export function useGetLogbookEntries(logbookId: number) {
  return useAppSelector((state) => getLogbookEntries(state, logbookId));
}
