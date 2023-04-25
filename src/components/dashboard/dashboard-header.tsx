import styled from "styled-components";
import { useEffect } from "react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import {
  createLogbookEntryRequest,
  fetchLogbookLogbookEntriesRequest,
} from "@/sagas/logbook-entries.saga";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.sixteen};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const NavigationPillsAndErrorMessage = styled.section`
  display: flex;
  flex-direction: column;
`;

const TotalSpent = styled.p`
  margin: 0 0 ${Styles.pxAsRem.four};
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const NavigationPills = styled.article`
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  justify-content: flex-start;
  align-items: center;
`;

const ErrorMessage = styled.p`
  margin: ${Styles.pxAsRem.eight} 0 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Buttons = styled.section`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
  margin-left: ${Styles.pxAsRem.twelve};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
  errorMessage?: string;
  infoClick?: () => void;
};

export const DashboardHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { logbookTotalSpent, selectedLogbookId } =
    Functions.useSignalsStore().dashboard;
  const { currentUser } = Functions.useEntitiesSlice();
  const currentUserLogbooks = Functions.useGetCurrentUserLogbooks();

  function createLogbookEntry(): void {
    if (selectedLogbookId.value) {
      dispatch(
        createLogbookEntryRequest({
          date: Functions.generateFormattedDate(new Date(), true),
          logbookId: selectedLogbookId.value,
        })
      );
    }
  }

  // ↓↓↓ Fetching current user's logbooks on load. ↓↓↓ //
  useEffect(() => {
    if (currentUser && currentUser.logbookIds.length === 0) {
      dispatch(fetchUserLogbooksRequest(currentUser.id));
    }
  }, [currentUser]);

  // ↓↓↓ Fetching the currently-selected logbook's associated logbook entries. ↓↓↓ //
  useEffect(() => {
    if (selectedLogbookId.value) {
      dispatch(fetchLogbookLogbookEntriesRequest(selectedLogbookId.value));
    }
  }, [selectedLogbookId.value]);

  return (
    <Container>
      <NavigationPillsAndErrorMessage>
        <TotalSpent>
          Total Spent: ${Functions.formattedNumber(logbookTotalSpent.value)}
        </TotalSpent>

        <NavigationPills>
          {" "}
          {currentUserLogbooks &&
            currentUserLogbooks.map((logbook: Types.Logbook, index: number) => {
              return (
                <Globals.NeutralPillButton
                  key={`dashboard-navbar-logbook-${logbook.id}-${index}`}
                  onClick={() => (selectedLogbookId.value = logbook.id)}
                  size="smaller"
                  selected={selectedLogbookId.value === logbook.id}
                  compact
                >
                  {logbook.name}
                </Globals.NeutralPillButton>
              );
            })}
        </NavigationPills>

        {props.errorMessage && (
          <ErrorMessage>{props.errorMessage}</ErrorMessage>
        )}
      </NavigationPillsAndErrorMessage>

      <Buttons>
        {props.infoClick && (
          <Globals.NeutralButtonOutlined
            size="medium"
            onClick={props.infoClick}
            compact
          >
            Info
          </Globals.NeutralButtonOutlined>
        )}
        {props.page === "Logbooks" && (
          <Globals.PrimaryButton
            size="medium"
            onClick={createLogbookEntry}
            compact
          >
            Create Logbook Entry
          </Globals.PrimaryButton>
        )}
      </Buttons>
    </Container>
  );
};
