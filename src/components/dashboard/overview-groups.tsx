import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as Globals from "@/components";
import * as OverviewGroupsSagas from "@/sagas/overview-groups.saga";
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
  // console.log("Overview Groups Rendered");

  const dispatch = Functions.useAppDispatch();

  const { loadingOverviewGroups } = Functions.useUiSlice();
  const overview = Functions.useFetchCurrentUserOverview();
  const overviewGroups = Functions.useFetchOverviewGroups();

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteAllPurchases = useCallback((overviewGroupId: number): void => {
    return Functions.deleteAllAssociatedPurchases(
      "Overview Group",
      dispatch,
      overviewGroupId
    );
  }, []);

  const addPurchase = useCallback((overviewGroupId: number): void => {
    return Functions.addPurchase("Overview Group", dispatch, overviewGroupId);
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
