import styled from "styled-components";
import { memo, useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { fetchLogbookEntryPurchasesByCategoryRequest } from "@/sagas/purchases.saga";

import { ReviewColumn } from "./review-column";

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

  const {
    reviewsNeedPurchases,
    reviewsPlannedPurchases,
    reviewsImpulsePurchases,
  } = Functions.useUiSlice();
  const logbookEntries = Functions.useGetLogbookLogbookEntries(props.logbookId);

  const purchasesLoading = useSignal(true);

  // ↓↓↓ Fetching logbook entry purchases. ↓↓↓ //
  useEffect(() => {
    if (logbookEntries && purchasesLoading.value) {
      for (const logbookEntry of logbookEntries) {
        dispatch(fetchLogbookEntryPurchasesByCategoryRequest(logbookEntry.id));
      }
      purchasesLoading.value = false;
    }
  }, [logbookEntries, purchasesLoading.value]);

  return (
    <Container>
      {purchasesLoading.value ? (
        <>
          <Globals.Shimmer
            key="dashboard-reviews-page-loading-shimmer-1"
            borderRadius="six"
            style={{ flex: 1 }}
          />
          <Globals.Shimmer
            key="dashboard-reviews-page-loading-shimmer-2"
            borderRadius="six"
            style={{ flex: 1 }}
          />
          <Globals.Shimmer
            key="dashboard-reviews-page-loading-shimmer-3"
            borderRadius="six"
            style={{ flex: 1 }}
          />
        </>
      ) : (
        <>
          <ReviewColumn
            key="dashboard-reviews-page-review-column-need"
            category="Need"
            purchases={reviewsNeedPurchases}
          />

          <ReviewColumn
            key="dashboard-reviews-page-review-column-planned"
            category="Planned"
            purchases={reviewsPlannedPurchases}
          />

          <ReviewColumn
            key="dashboard-reviews-page-review-column-impulse"
            category="Impulse"
            purchases={reviewsImpulsePurchases}
          />
        </>
      )}
    </Container>
  );
};
