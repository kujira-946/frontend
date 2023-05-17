import styled from "styled-components";
import { memo } from "react";

import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { LogbooksOverview } from "./logbooks-overview";
import { ReviewsSidebar } from "./reviews-sidebar";
import { SettingsSidebar } from "./settings-sidebar";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  page: Types.DashboardPage;
};

const Container = styled.aside<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.page === "Logbooks" ? "300px" : "auto")};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
};

const ExportedComponent = (props: Props) => {
  console.log("Dashboard Sidebar Rendered");

  return (
    <Container page={props.page}>
      {props.page === "Logbooks" ? (
        <LogbooksOverview />
      ) : props.page === "Reviews" ? (
        <ReviewsSidebar />
      ) : (
        <SettingsSidebar />
      )}
    </Container>
  );
};

export const DashboardSidebar = memo(ExportedComponent);
