import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import {
  fetchOverviewOverviewGroupsRequest,
  updateOverviewGroupRequest,
} from "@/sagas/overview-groups.saga";

import { OverviewDropdown } from "./overview-dropdown";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
  updatePurchaseRequest,
} from "@/sagas/purchases.saga";

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
      const previousIndex = result.source.index;
      const newIndex = result.destination?.index;
      if (newIndex && newIndex !== previousIndex) {
        const purchaseId = Number(result.draggableId);
        const updatedPlacement = newIndex + 1;
        // dispatch(
        //   updatePurchaseRequest(purchaseId, { placement: updatedPlacement })
        // );
      }
    };
  }, []);

  const deleteAssociatedPurchases = useCallback(
    (overviewGroupId: number): void => {
      dispatch(deleteAssociatedPurchasesRequest({ overviewGroupId }));
      dispatch(updateOverviewGroupRequest(overviewGroupId, { totalCost: 0 }));
    },
    []
  );

  const addPurchaseToOverviewGroup = useCallback(
    (overviewGroupId: number): void => {
      dispatch(createPurchaseRequest({ placement: 0, overviewGroupId }));
    },
    []
  );

  useEffect(() => {
    if (overview && !overviewGroups) {
      dispatch(fetchOverviewOverviewGroupsRequest(overview.id));
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
                deleteAllOverviewPurchases={deleteAssociatedPurchases}
                addOverviewPurchase={addPurchaseToOverviewGroup}
              />
            );
          })}
        </>
      ) : null}
    </Container>
  );
};
