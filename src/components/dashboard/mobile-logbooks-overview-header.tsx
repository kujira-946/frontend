import styled from "styled-components";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.div`
  ${Styles.setMediaPaddings("eight")};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twenty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  ${Styles.setMediaPaddings("eight")};
`;

const OverviewButton = styled(Globals.IconButton)`
  ${Styles.transition};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
      border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const MobileLogbooksOverviewHeader = () => {
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const { mobileOverviewOpen, selectedLogbookId } =
    Functions.useSignalsStore().dashboard;

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

  return (
    <Container>
      {selectedLogbookId.value && (
        <Globals.Button
          type="button"
          onClick={createLogbookEntry}
          size="medium"
          style={{ height: "100%" }}
          primary
        >
          Create Logbook Entry
        </Globals.Button>
      )}

      {theme.value && (
        <OverviewButton
          type="button"
          onClick={() => (mobileOverviewOpen.value = true)}
        >
          <Icons.Overview
            width={16}
            height={16}
            fill={Styles.background[theme.value].eight}
            addHover
          />
        </OverviewButton>
      )}
    </Container>
  );
};
