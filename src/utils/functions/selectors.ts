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

// ========================================================================================= //
// [ CURRENT USER ] ======================================================================== //
// ========================================================================================= //

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

// ========================================================================================= //
// [ OVERVIEW ] ============================================================================ //
// ========================================================================================= //

const getOverviewOverviewGroups = createSelector(
  (state: GlobalState) => state.entities.overview,
  (state: GlobalState) => state.entities.overviewGroups,
  (overview, overviewGroups) => {
    if (overview && overviewGroups) {
      return overview.overviewGroupIds.map((overviewGroupId: number) => {
        return overviewGroups[overviewGroupId];
      });
    }
  }
);
export function useGetOverviewOverviewGroups() {
  return useAppSelector(getOverviewOverviewGroups);
}

// ========================================================================================= //
// [ OVERVIEW GROUPS ] ===================================================================== //
// ========================================================================================= //

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

// ========================================================================================= //
// [ LOGBOOKS ] ============================================================================ //
// ========================================================================================= //

const getLogbook = createSelector(
  (state: GlobalState) => state.entities.logbooks,
  (state: GlobalState, logbookId: number) => logbookId,
  (logbooks, logbookId) => {
    if (logbooks && logbookId) return logbooks[logbookId];
  }
);
export function useGetLogbook(logbookId: number) {
  return useAppSelector((state) => getLogbook(state, logbookId));
}

const getLogbookTotalSpent = createSelector(
  (state: GlobalState) => state.entities.logbooks,
  (state: GlobalState, logbookId: number) => logbookId,
  (state: GlobalState) => state.entities.logbookEntries,
  (logbooks, logbookId, logbookEntries) => {
    if (logbooks && logbookEntries) {
      const logbook = logbooks[logbookId];
      if (logbook.logbookEntryIds) {
        let totalSpent = 0;
        for (const logbookEntryId of logbook.logbookEntryIds) {
          totalSpent += logbookEntries[logbookEntryId].totalSpent;
        }
        return totalSpent;
      }
    }
  }
);
export function useGetLogbookTotalSpent(logbookId: number) {
  return useAppSelector((state) => getLogbookTotalSpent(state, logbookId));
}

const getLogbookLogbookEntries = createSelector(
  (state: GlobalState) => state.entities.logbooks,
  (state: GlobalState) => state.entities.logbookEntries,
  (state: GlobalState, logbookId: number) => logbookId,
  (logbooks, logbookEntries, logbookId) => {
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
export function useGetLogbookLogbookEntries(logbookId: number) {
  return useAppSelector((state) => getLogbookLogbookEntries(state, logbookId));
}

const getLogbookEntry = createSelector(
  (state: GlobalState) => state.entities.logbookEntries,
  (state: GlobalState, logbookEntryId: number) => logbookEntryId,
  (logbookEntries, logbookEntryId) => {
    if (logbookEntries) return logbookEntries[logbookEntryId];
  }
);
export function useGetLogbookEntry(logbookEntryId: number) {
  return useAppSelector((state) => getLogbookEntry(state, logbookEntryId));
}

const getLogbookEntryPurchases = createSelector(
  (state: GlobalState) => state.entities.logbookEntries,
  (state: GlobalState, logbookEntryId: number) => logbookEntryId,
  (state: GlobalState) => state.entities.purchases,
  (logbookEntries, logbookEntryId, purchases) => {
    if (logbookEntries && purchases) {
      const logbookEntry = logbookEntries[logbookEntryId];
      if (logbookEntry.purchaseIds) {
        return logbookEntry.purchaseIds.map((purchaseId: number) => {
          return purchases[purchaseId];
        });
      }
    }
  }
);
export function useGetLogbookEntryPurchases(logbookEntryId: number) {
  return useAppSelector((state) =>
    getLogbookEntryPurchases(state, logbookEntryId)
  );
}
