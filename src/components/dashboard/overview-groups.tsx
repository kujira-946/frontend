import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as OverviewGroupsSagas from "@/sagas/overview-groups.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
} from "@/sagas/purchases.saga";

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
  const overview = Functions.useFetchCurrentUserOverview();
  const overviewGroups = Functions.useFetchCurrentUserOverviewGroups();

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteAllPurchases = useCallback((overviewGroupId: number): void => {
    dispatch(deleteAssociatedPurchasesRequest({ overviewGroupId }));
  }, []);

  const addPurchase = useCallback((overviewGroupId: number): void => {
    dispatch(createPurchaseRequest({ placement: 0, overviewGroupId }));
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
            return (
              <OverviewGroupDropdown
                key={`dashboard-overviews-overview-group-dropdown-${overviewGroup.id}`}
                // title={overviewGroup.name}
                // totalCost={overviewGroup.totalCost}
                // purchaseCount={overviewGroup.purchaseIds?.length || 0}
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
