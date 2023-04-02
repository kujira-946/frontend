import * as Saga from "redux-saga/effects";

import * as Redux from "@/redux";

export function sagaError(error: any) {
  console.log(error);
  return Saga.put(
    Redux.uiActions.setNotification({
      title: "Failure",
      body: error.response.data.body,
      type: "failure",
      timeout: 10000,
    })
  );
}
