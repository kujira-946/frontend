import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

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

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //
