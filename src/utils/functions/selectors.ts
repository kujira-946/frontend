import createCachedSelector from "re-reselect";
import { shallowEqual } from "react-redux";
import { createSelector } from "reselect";

import { GlobalState } from "@/store";

import { useAppSelector } from "./hooks";

export function useUiSlice(shallow: boolean = false) {
  return useAppSelector(
    (state) => state.ui,
    shallow ? shallowEqual : undefined
  );
}

export function useEntitiesSlice(shallow: boolean = false) {
  return useAppSelector(
    (state) => state.entities,
    shallow ? shallowEqual : undefined
  );
}

export function useErrorsSlice(shallow: boolean = false) {
  return useAppSelector(
    (state) => state.errors,
    shallow ? shallowEqual : undefined
  );
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

export const getOverviewGroup = createCachedSelector(
  (state: GlobalState) => state.entities.overviewGroups,
  (state: GlobalState, overviewGroupId: number) => overviewGroupId,
  (overviewGroups, overviewGroupId) => {
    if (overviewGroups) return overviewGroups[overviewGroupId];
  }
)((_state_: GlobalState, overviewGroupId: number) => overviewGroupId);
export function useGetOverviewGroup(overviewGroupId: number) {
  return useAppSelector((state) => getOverviewGroup(state, overviewGroupId));
}

const getOverviewGroupPurchases = createCachedSelector(
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
)((_state_: GlobalState, overviewGroupId: number) => overviewGroupId);
export function useGetOverviewGroupPurchases(overviewGroupId: number) {
  return useAppSelector((state) =>
    getOverviewGroupPurchases(state, overviewGroupId)
  );
}

// ========================================================================================= //
// [ LOGBOOKS ] ============================================================================ //
// ========================================================================================= //

const getUserLogbooks = createSelector(
  (state: GlobalState) => state.entities.currentUser,
  (state: GlobalState) => state.entities.logbooks,
  (currentUser, logbooks) => {
    if (currentUser && currentUser.logbookIds && logbooks) {
      return currentUser.logbookIds.map((logbookId: number) => {
        return logbooks[logbookId];
      });
    }
  }
);
export function useGetUserLogbooks() {
  return useAppSelector(getUserLogbooks);
}

export const getLogbook = createCachedSelector(
  (state: GlobalState) => state.entities.logbooks,
  (state: GlobalState, logbookId: number) => logbookId,
  (logbooks, logbookId) => {
    if (logbooks && logbookId) return logbooks[logbookId];
  }
)((_state_: GlobalState, logbookId: number) => logbookId);
export function useGetLogbook(logbookId: number) {
  return useAppSelector((state) => getLogbook(state, logbookId));
}

const getLogbookTotalSpent = createCachedSelector(
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
)((_state_: GlobalState, logbookId: number) => logbookId);
export function useGetLogbookTotalSpent(logbookId: number) {
  return useAppSelector((state) => getLogbookTotalSpent(state, logbookId));
}

export const getLogbookEntry = createCachedSelector(
  (state: GlobalState) => state.entities.logbookEntries,
  (state: GlobalState, logbookEntryId: number) => logbookEntryId,
  (logbookEntries, logbookEntryId) => {
    if (logbookEntries) return logbookEntries[logbookEntryId];
  }
)((_state_: GlobalState, logbookEntryId: number) => logbookEntryId);
export function useGetLogbookEntry(logbookEntryId: number) {
  return useAppSelector((state) => getLogbookEntry(state, logbookEntryId));
}

const getLogbookLogbookEntries = createCachedSelector(
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
)((_state_: GlobalState, logbookId: number) => logbookId);
export function useGetLogbookLogbookEntries(logbookId: number) {
  return useAppSelector((state) => getLogbookLogbookEntries(state, logbookId));
}

const getLogbookEntryPurchases = createCachedSelector(
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
)((_state_: GlobalState, logbookEntryId: number) => logbookEntryId);
export function useGetLogbookEntryPurchases(logbookEntryId: number) {
  return useAppSelector((state) =>
    getLogbookEntryPurchases(state, logbookEntryId)
  );
}

// ========================================================================================= //
// [ PURCHASES ] =================================================================== //
// ========================================================================================= //

export const getPurchase = createCachedSelector(
  (state: GlobalState) => state.entities.purchases,
  (state: GlobalState, purchaseId: number) => purchaseId,
  (purchases, purchaseId) => {
    if (purchases && purchases[purchaseId]) {
      return purchases[purchaseId];
    }
  }
)((_state_: GlobalState, purchaseId: number) => purchaseId);
