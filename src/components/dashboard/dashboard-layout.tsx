import styled from "styled-components";

import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { OverviewNavbar } from "./overview-navbar";
import { UserSummary } from "./user-summary";
import { OverviewGroups } from "./overview-groups";
import { DashboardNavbar } from "./dashboard-navbar";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.main`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
`;

const Overview = styled.section`
  position: relative;
  width: 18.75rem;
  height: 100%;
  border-right: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  overflow-y: auto;
`;

const Body = styled.section`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`;

const Children = styled.section`
  border: blue solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  const navigation: Types.DashboardNavigation[] = [
    { text: "Foo", onClick: () => console.log("Foo"), selected: true },
    { text: "Bar", onClick: () => console.log("Bar"), selected: false },
    { text: "Baz", onClick: () => console.log("Baz"), selected: false },
  ];

  function showInfo(): void {
    console.log("Show Info");
  }

  function createLogbookEntry(): void {
    console.log("Create Logbook Entry");
  }

  return (
    <Container>
      <Overview>
        <OverviewNavbar />
        <UserSummary page={props.page} />
        <OverviewGroups />
      </Overview>

      <Body>
        <DashboardNavbar
          page={props.page}
          navigation={navigation}
          infoClick={showInfo}
          createClick={createLogbookEntry}
          createText="Log Entry"
        />
        <Children>{props.children}</Children>
      </Body>
    </Container>
  );
};
