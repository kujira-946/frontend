import styled from "styled-components";

import { ThemeProps } from "../layout";

import { OverviewNavbar } from "./overview";

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

  border: red solid 1px;
`;

const Overview = styled.section`
  width: 400px;
  height: 100%;
  border-right: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const Children = styled.section`
  flex: 1;

  /* border: blue solid 1px; */
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  children: React.ReactNode;
};

export const DashboardPartial = (props: Props) => {
  return (
    <Container>
      <Overview>
        <OverviewNavbar />
      </Overview>
			
      <Children>{props.children}</Children>
    </Container>
  );
};
