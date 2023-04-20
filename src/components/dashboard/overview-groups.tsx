import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as OverviewGroupsSagas from "@/sagas/overview-groups.saga";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

import { OverviewGroupDropdown } from "./overview-group-dropdown";
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

  const { loadingOverviewGroups } = Functions.useUiSlice();
  const { overview } = Functions.useEntitiesSlice();
  const overviewGroups = Functions.useGetOverviewOverviewGroups();

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteAllPurchases = useCallback((overviewGroupId: number): void => {
    dispatch(
      PurchasesSagas.deleteAssociatedPurchasesRequest({ overviewGroupId })
    );
  }, []);

  const addPurchase = useCallback((overviewGroupId: number): void => {
    dispatch(
      PurchasesSagas.createPurchaseRequest({ placement: 0, overviewGroupId })
    );
  }, []);

  useEffect(() => {
    if (overview && !overviewGroups) {
      dispatch(Redux.uiActions.setLoadingOverviewGroups(true));
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
            if (overviewGroup.name === "Recurring") {
              return (
                <OverviewGroupDropdown
                  key={`dashboard-overviews-overview-group-dropdown-${overviewGroup.id}`}
                  overviewGroupId={overviewGroup.id}
                  onDragEnd={onDragEnd}
                  deleteAllPurchases={deleteAllPurchases}
                  addPurchase={addPurchase}
                  initiallyOpen
                />
              );
            } else {
              return (
                <OverviewGroupDropdown
                  key={`dashboard-overviews-overview-group-dropdown-${overviewGroup.id}`}
                  overviewGroupId={overviewGroup.id}
                  onDragEnd={onDragEnd}
                  deleteAllPurchases={deleteAllPurchases}
                  addPurchase={addPurchase}
                />
              );
            }
          })}
        </>
      ) : null}
    </Container>
  );
};
