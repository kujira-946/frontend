import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";
import { useCallback, useEffect, useMemo } from "react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";

import { Dropdown } from "./dropdown";
import { fetchOverviewGroupPurchasesRequest } from "@/sagas/purchases.saga";
import { deletePurchaseRequest } from "@/sagas/purchases.saga";

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
  const dispatch = Functions.useAppDispatch();

  const { overviews, overviewGroups, purchases } = Functions.useEntitiesSlice();
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

  const purchaseCellDeleteAction = useCallback((purchaseId: number) => {
    dispatch(deletePurchaseRequest(purchaseId));
  }, []);

  const fetchedOverviewGroups = Functions.useAppSelector(
    Functions.fetchOverviewGroups
  );

  const overviewGroupDropdowns = useMemo(() => {
    return (
      fetchedOverviewGroups &&
      fetchedOverviewGroups.map((overviewGroup: Types.OverviewGroup) => {
        return (
          <Dropdown
            key={`dashboard-overview-overview-groups-${overviewGroup.id}`}
            initiallyOpen={false}
            title={overviewGroup.name}
            totalCost={Functions.roundNumber(overviewGroup.totalCost, 2)}
            purchaseCount={
              overviewGroup.purchaseIds ? overviewGroup.purchaseIds.length : 0
            }
            onDragEnd={onDragEnd}
            deleteAllPurchases={() => "Delete All Purchases"}
            addPurchase={() => "Add Purchase"}
          >
            <>
              {purchases &&
                overviewGroup.purchaseIds &&
                overviewGroup.purchaseIds.map((purchaseId: number) => {
                  const purchase = purchases[purchaseId];
                  return (
                    <Globals.PurchaseCell
                      key={`dashboard-overview-overview-groups-purchase-cell-${purchaseId}`}
                      borderRadius="four"
                      selectionValue={purchaseId}
                      description={purchase.description || ""}
                      cost={purchase.cost?.toString() || ""}
                      deleteAction={purchaseCellDeleteAction}
                      costFrontText="$"
                      hideCheck
                      hideCategories
                    />
                  );
                })}
            </>
          </Dropdown>
        );
      })
    );
  }, [fetchedOverviewGroups, purchases]);

  useEffect(() => {
    if (overviews && !overviewGroups) {
      const overview = Object.values(overviews)[0];
      dispatch(fetchOverviewOverviewGroupsRequest(overview.id));
    }
  }, [overviews, overviewGroups]);

  useEffect(() => {
    if (overviewGroups && !purchases) {
      const overviewGroupIds = Object.keys(overviewGroups).map(
        (overviewGroupId: string) => Number(overviewGroupId)
      );
      for (const overviewGroupId of overviewGroupIds) {
        dispatch(fetchOverviewGroupPurchasesRequest(overviewGroupId));
      }
    }
  }, [overviewGroups, purchases]);

  return (
    <Container>
      {loadingOverviewGroups ? (
        <>
          <Globals.Shimmer borderRadius="six" height={40} />
          <Globals.Shimmer borderRadius="six" height={40} />
        </>
      ) : (
        <>{overviewGroupDropdowns ?? null}</>
      )}
    </Container>
  );
};
