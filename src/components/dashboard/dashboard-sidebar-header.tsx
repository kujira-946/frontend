import styled from "styled-components";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.twelve};
`;

const Header = styled.header`
  display: flex;
`;

const TitleAndCaption = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Caption = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundTen};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};
`;

const FilterButton = styled(Globals.IconButton)`
  margin-left: ${Styles.pxAsRem.twelve};
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

type Props = {
  title: Types.DashboardPage;
  caption: string;
};

export const DashboardSidebarHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;

  return (
    <Container>
      <Header>
        <TitleAndCaption>
          <Title>{props.title}</Title>
          <Caption>{props.caption}</Caption>
        </TitleAndCaption>

        {theme.value && props.title === "Logbooks" && (
          <FilterButton borderRadius="six">
            <Icons.Filter
              width={16}
              height={16}
              fill={Styles.background[theme.value].ten}
              addHover
            />
          </FilterButton>
        )}
      </Header>

      {props.title === "Logbooks" && (
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
          primary
        >
          Create Logbook Entry
        </Globals.Button>
      )}
    </Container>
  );
};
