import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";
import { memo, useCallback, useEffect, useMemo } from "react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";

import { OverviewDropdown } from "./overview-dropdown";
import { fetchOverviewGroupPurchasesRequest } from "@/sagas/purchases.saga";
import { deletePurchaseRequest } from "@/sagas/purchases.saga";
import { GlobalState } from "@/store";

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

const ExportedComponent = () => {
  // console.log("Overview Groups Rendered");

  const dispatch = Functions.useAppDispatch();

  const { purchases } = Functions.useEntitiesSlice();
  const { loadingOverviewGroups } = Functions.useUiSlice();

  function onDragEnd(
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ): void {
    // const updatedPurchases = Functions.deepCopy(props.purchases.value);
    // const draggedElement = updatedPurchases.splice(result.source.index, 1);
    // if (result.destination) {
    //   updatedPurchases.splice(result.destination.index, 0, ...draggedElement);
    //   props.purchases.value = updatedPurchases;
    // }
  }

  const overview = Functions.useAppSelector(Functions.fetchCurrentUserOverview);
  const overviewGroups = Functions.useAppSelector(
    Functions.fetchOverviewGroups
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
                deleteAllPurchases={() => console.log("Delete All Purchases")}
                addPurchase={() => console.log("Add Purchase")}
              />
            );
          })}
        </>
      ) : null}
    </Container>
  );
};

export const OverviewGroups = memo(ExportedComponent);
// export const OverviewGroups = ExportedComponent;
