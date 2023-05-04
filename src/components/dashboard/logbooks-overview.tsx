import styled from "styled-components";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence } from "framer-motion";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";
import { ThemeProps } from "../layout";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { UserSummary } from "./user-summary-new";
import { LogbooksOverviewGroup } from "./logbooks-overview-group";
import { LogbooksFiltersModal } from "../modals/logbooks-filters-modal";
import { useCallback } from "react";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
} from "@/sagas/purchases.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  position: relative;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${Styles.pxAsRem.twelve};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const OverviewGroups = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.twelve};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbooksOverview = () => {
  const dispatch = Functions.useAppDispatch();

  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const { logbooks } = Functions.useEntitiesSlice(true);
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
      <Header>
        <DashboardSidebarHeader
          title="Logbooks"
          caption={
            logbooks && selectedLogbookId.value
              ? logbooks[selectedLogbookId.value].name
              : "Select a logbook."
          }
          openModal={() => (filtersOpen.value = true)}
          standalone
        />
        {selectedLogbookId.value && (
          <Globals.Button
            type="button"
            onClick={() => {
              if (selectedLogbookId.value) {
                dispatch(
                  createLogbookEntryRequest({
                    date: Functions.generateFormattedDate(new Date(), true),
                    logbookId: selectedLogbookId.value,
                  })
                );
              }
            }}
            size="medium"
            borderRadius="six"
            style={{ marginTop: Styles.pxAsRem.twelve }}
            primary
          >
            Create Logbook Entry
          </Globals.Button>
        )}
      </Header>

      <UserSummary />

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
        {filtersOpen.value && (
          <LogbooksFiltersModal
            open={filtersOpen}
            selectedLogbookId={selectedLogbookId}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};
