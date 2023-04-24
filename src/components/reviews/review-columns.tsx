import styled from "styled-components";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { fetchLogbookLogbookEntriesRequest } from "@/sagas/logbook-entries.saga";
import { fetchLogbookEntryPurchasesRequest } from "@/sagas/purchases.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  gap: ${Styles.pxAsRem.sixteen};
  height: 100%;
  padding: ${Styles.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  logbookId: number;
};

export const ReviewColumns = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { purchases } = Functions.useEntitiesSlice();
  const logbookEntries = Functions.useGetLogbookLogbookEntries(props.logbookId);

  const purchasesLoading = useSignal(true);
  const reviewsLoading = useSignal(true);
  const needs = useSignal<Types.Purchase[]>([]);
  const planned = useSignal<Types.Purchase[]>([]);
  const impulse = useSignal<Types.Purchase[]>([]);

  // ↓↓↓ Fetching the currently-selected logbook's associated logbook entries. ↓↓↓ //
  useEffect(() => {
    dispatch(fetchLogbookLogbookEntriesRequest(props.logbookId));
  }, []);

  // ↓↓↓ Fetching logbook entry purchases. ↓↓↓ //
  useEffect(() => {
    if (logbookEntries && purchasesLoading.value) {
      logbookEntries.forEach((logbookEntry: Types.LogbookEntry) => {
        dispatch(fetchLogbookEntryPurchasesRequest(logbookEntry.id));
      });
      purchasesLoading.value = false;
    }
  }, [logbookEntries, purchasesLoading.value]);

  // ↓↓↓ Separating all logbook purchases into their respective categories. ↓↓↓ //
  useEffect(() => {
    if (
      purchases &&
      logbookEntries &&
      !purchasesLoading.value &&
      reviewsLoading.value
    ) {
      logbookEntries.forEach((logbookEntry: Types.LogbookEntry) => {
        if (logbookEntry.purchaseIds) {
          logbookEntry.purchaseIds.forEach((purchaseId: number) => {
            const purchase = purchases[purchaseId];
            if (purchase.category === "need") {
              needs.value = [...needs.value, purchase];
            } else if (purchase.category === "planned") {
              planned.value = [...planned.value, purchase];
            } else if (purchase.category === "impulse") {
              impulse.value = [...impulse.value, purchase];
            }
          });
        }
      });
      reviewsLoading.value = false;
    }
  }, [purchases, logbookEntries, purchasesLoading.value, reviewsLoading.value]);

  return (
    <Container>
      {reviewsLoading.value ? (
        <>
          <Globals.Shimmer borderRadius="six" style={{ flex: 1 }} />
          <Globals.Shimmer borderRadius="six" style={{ flex: 1 }} />
          <Globals.Shimmer borderRadius="six" style={{ flex: 1 }} />
        </>
      ) : null}
    </Container>
  );
};
