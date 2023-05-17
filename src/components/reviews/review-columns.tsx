import styled from "styled-components";
import { useEffect } from "react";

import * as Globals from "@/components";
import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { fetchLogbookEntryPurchasesByCategoryRequest } from "@/sagas/purchases.saga";

import { ReviewColumn } from "./review-column";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  height: 100%;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  selectedLogbookId: number;
};

export const ReviewColumns = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const {
    loadingPurchases,
    reviewsNeedPurchases,
    reviewsPlannedPurchases,
    reviewsImpulsePurchases,
  } = Functions.useUiSlice(true);

  const logbookEntries = Functions.useGetLogbookLogbookEntries(
    props.selectedLogbookId
  );

  // ↓↓↓ Fetching logbook entry purchases. ↓↓↓ //
  useEffect(() => {
    dispatch(Redux.uiActions.setLoadingPurchases(true));
    if (logbookEntries) {
      const logbookEntryIds = logbookEntries.map(
        (logbookEntry: Types.LogbookEntry) => {
          return logbookEntry.id;
        }
      );
      dispatch(fetchLogbookEntryPurchasesByCategoryRequest(logbookEntryIds));
    }
  }, [logbookEntries]);

  return (
    <Container>
      {loadingPurchases ? (
        <>
          <Globals.Shimmer
            key="dashboard-reviews-page-loading-shimmer-1"
            borderRadius="eight"
            style={{ flex: 1 }}
          />
          <Globals.Shimmer
            key="dashboard-reviews-page-loading-shimmer-2"
            borderRadius="eight"
            style={{ flex: 1 }}
          />
          <Globals.Shimmer
            key="dashboard-reviews-page-loading-shimmer-3"
            borderRadius="eight"
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
