import styled from "styled-components";
import { useCallback } from "react";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { OverviewShimmer } from "@/components/shimmer";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
} from "@/sagas/purchases.saga";

import { LogbooksOverviewGroup } from "./logbooks-overview-group";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type OverviewGroupsProps = { inModal?: true };

const OverviewGroups = styled.section<OverviewGroupsProps>`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.twelve};

  ${(props) => {
    return (
      props.inModal && Styles.setMediaPaddings("twenty", "twenty", "fourteen")
    );
  }};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbookOverviewGroups = (props: OverviewGroupsProps) => {
  const dispatch = Functions.useAppDispatch();

  const { loadingOverviewGroups } = Functions.useUiSlice();
  const overviewGroups = Functions.useGetOverviewOverviewGroups();

  const deleteAllPurchases = useCallback(
    (purchaseIds: number[], overviewGroupId: number): void => {
      dispatch(
        deleteAssociatedPurchasesRequest(purchaseIds, {
          overviewGroupId,
        })
      );
    },
    []
  );

  const addPurchase = useCallback((overviewGroupId: number): void => {
    dispatch(createPurchaseRequest({ placement: 0, overviewGroupId }));
  }, []);

  if (!overviewGroups) {
    return null;
  } else {
    return (
      <OverviewGroups inModal={props.inModal}>
        {loadingOverviewGroups ? (
          <>
            <OverviewShimmer />
            <OverviewShimmer />
          </>
        ) : (
          overviewGroups.map(
            (overviewGroup: Types.OverviewGroup, index: number) => {
              return (
                <LogbooksOverviewGroup
                  key={`logbooks-overview-overview-group-${overviewGroup.id}-${index}`}
                  overviewGroupId={overviewGroup.id}
                  overviewGroupName={overviewGroup.name}
                  overviewGroupTotalSpent={overviewGroup.totalSpent}
                  overviewGroupPurchaseIds={overviewGroup.purchaseIds || []}
                  deleteAllPurchases={deleteAllPurchases}
                  addPurchase={addPurchase}
                  startOpened={index === 0}
                />
              );
            }
          )
        )}
      </OverviewGroups>
    );
  }
};
