import styled from "styled-components";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { standalone?: true };

const Container = styled.section<ContainerProps>`
  display: flex;
  width: 100%;
  padding: ${(props) => (props.standalone ? Styles.pxAsRem.twelve : 0)};
  border-bottom: ${(props: ContainerProps & ThemeProps) => {
    return props.standalone
      ? `${props.theme.backgroundFour} solid 1px`
      : "transparent";
  }};
`;

const PageAndCaption = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Page = styled.h1`
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
  page: Types.DashboardPage;
  caption: string;
  openModal?: () => void;
  standalone?: true;
};

export const DashboardSidebarHeader = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Container standalone={props.standalone}>
      <PageAndCaption>
        <Page>{props.page}</Page>
        <Caption>{props.caption}</Caption>
      </PageAndCaption>

      {theme.value && props.page === "Logbooks" && (
        <FilterButton onClick={props.openModal} borderRadius="six">
          <Icons.Filter
            width={16}
            height={16}
            fill={Styles.background[theme.value].ten}
            addHover
          />
        </FilterButton>
      )}
    </Container>
  );
};
