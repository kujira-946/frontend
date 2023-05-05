import dynamic from "next/dynamic";
import styled from "styled-components";
import { useCallback } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence } from "framer-motion";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
} from "@/sagas/purchases.saga";
import { ThemeProps } from "../layout";

import { LogbooksOverviewHeader } from "./logbooks-overview-header";
import { LogbooksUserSummary } from "./logbooks-user-summary";
import { LogbooksOverviewGroup } from "./logbooks-overview-group";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  position: relative;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const OverviewGroups = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.twelve};
`;

// ========================================================================================= //
// [ DYNAMIC COMPONENTS ] ================================================================== //
// ========================================================================================= //

const DynamicLogbookFiltersModal = dynamic(() =>
  import("../modals/logbooks-filters-modal").then(
    (mod) => mod.LogbooksFiltersModal
  )
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbooksOverview = () => {
  const dispatch = Functions.useAppDispatch();

  const overviewGroups = Functions.useGetOverviewOverviewGroups();

  const filtersOpen = useSignal(false);

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

  return (
    <Container>
      <LogbooksOverviewHeader filtersOpen={filtersOpen} />

      <LogbooksUserSummary />

      {overviewGroups && (
        <OverviewGroups>
          {overviewGroups.map(
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
          )}
        </OverviewGroups>
      )}

      <AnimatePresence>
        {filtersOpen.value && <DynamicLogbookFiltersModal open={filtersOpen} />}
      </AnimatePresence>
    </Container>
  );
};
