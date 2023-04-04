import styled from "styled-components";

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

  border: green solid 1px;
`;

const Children = styled.section`
  flex: 1;

  border: blue solid 1px;
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
      <Overview>Overview</Overview>
      <Children>{props.children}</Children>
    </Container>
  );
};
