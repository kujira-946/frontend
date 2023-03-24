import * as Types from "@/utils/types";

enum OverviewsActionTypes {
  FETCH_OVERVIEWS = "FETCH_OVERVIEWS",
  FETCH_USER_OVERVIEWS = "FETCH_USER_OVERVIEWS",
  BULK_FETCH_OVERVIEWS = "BULK_FETCH_OVERVIEWS",
  FETCH_OVERVIEW = "FETCH_OVERVIEW",
  CREATE_OVERVIEW = "CREATE_OVERVIEW",
  UPDATE_OVERVIEW = "UPDATE_OVERVIEW",
  DELETE_OVERVIEW = "DELETE_OVERVIEW",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchOverviewsRequest(): Types.NullAction {
  return {
    type: OverviewsActionTypes.FETCH_OVERVIEWS,
    payload: null,
  };
}

export function fetchUserOverviewsRequest(id: number): Types.IdAction {
  return {
    type: OverviewsActionTypes.FETCH_USER_OVERVIEWS,
    payload: { id },
  };
}

export function bulkFetchOverviews(ids: number[]): Types.IdAction[] {
	
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //
