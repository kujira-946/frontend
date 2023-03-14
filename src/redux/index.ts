import { UIState, uiActions, uiReducer } from "./ui-slice";
import {
  EntitiesState,
  entitiesActions,
  entitiesReducer,
} from "./entities-slice";
import { ErrorsState, errorsActions, errorsReducer } from "./errors-slice";

export type { UIState, EntitiesState, ErrorsState };

export {
  uiActions,
  uiReducer,
  entitiesActions,
  entitiesReducer,
  errorsActions,
  errorsReducer,
};
