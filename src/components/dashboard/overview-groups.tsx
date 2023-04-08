import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as Globals from "@/components";
import * as OverviewGroupsSagas from "@/sagas/overview-groups.saga";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

import { OverviewDropdown } from "./overview-dropdown";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const OverviewGroups = () => {
  // console.log("Overview Groups Rendered");

  const dispatch = Functions.useAppDispatch();

  const { loadingOverviewGroups } = Functions.useUiSlice();
  const overview = Functions.useAppSelector(Functions.fetchCurrentUserOverview);
  const overviewGroups = Functions.useAppSelector(
    Functions.fetchOverviewGroups
  );

  const onDragEnd = useCallback(() => {
    (result: Drag.DropResult, _: Drag.ResponderProvided): void => {
      console.log("Overview Dragged");
      const previousIndex = result.source.index;
      const newIndex = result.destination?.index;
      if (newIndex && newIndex !== previousIndex) {
        const purchaseId = Number(result.draggableId);
        const updatedPlacement = newIndex + 1;
        console.log("Purchase Id:", purchaseId);
        console.log("Updated Placement:", updatedPlacement);
        // dispatch(
        //   PurchasesSagas.updatePurchaseRequest(purchaseId, { placement: updatedPlacement })
        // );
      }
    };
  }, []);

  const deleteAllPurchases = useCallback((overviewGroupId: number): void => {
    dispatch(
      PurchasesSagas.deleteAssociatedPurchasesRequest({ overviewGroupId })
    );
    dispatch(
      OverviewGroupsSagas.updateOverviewGroupRequest(overviewGroupId, {
        totalCost: 0,
      })
    );
  }, []);

  const addPurchase = useCallback((overviewGroupId: number): void => {
    dispatch(
      PurchasesSagas.createPurchaseRequest({ placement: 0, overviewGroupId })
    );
  }, []);

  useEffect(() => {
    if (overview && !overviewGroups) {
      dispatch(
        OverviewGroupsSagas.fetchOverviewOverviewGroupsRequest(overview.id)
      );
    }
  }, [overview, overviewGroups]);

  return (
    <Container>
      {loadingOverviewGroups ? (
        <>
          <Globals.Shimmer borderRadius="six" height={40} />
          <Globals.Shimmer borderRadius="six" height={40} />
        </>
      ) : overviewGroups ? (
        <>
          {overviewGroups.map((overviewGroup: Types.OverviewGroup) => {
            return (
              <OverviewDropdown
                key={`dashboard-overviews-overview-group-dropdown-${overviewGroup.id}`}
                initiallyOpen={false}
                title={overviewGroup.name}
                totalCost={overviewGroup.totalCost}
                purchaseCount={overviewGroup.purchaseIds?.length || 0}
                overviewGroupId={overviewGroup.id}
                onDragEnd={onDragEnd}
                deleteAllPurchases={deleteAllPurchases}
                addPurchase={addPurchase}
              />
            );
          })}
        </>
      ) : null}
    </Container>
  );
};
