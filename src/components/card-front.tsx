import styled from "styled-components";

import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 180px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-radius: 6px;
  border: ${(props: ThemeProps) => props.theme.primaryMain} solid 1px;

  ${(props: ThemeProps) => props.theme.shadowOne};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: ${(props: ThemeProps) => props.theme.primaryMain} solid 1px;
  padding: 10px 16px;
`;

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border: ${(props: ThemeProps) => props.theme.backgroundFive} solid 1px;
  border-radius: 999px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding: 16px;
`;

const OvalsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Ovals = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Oval = styled.div`
  width: 10px;
  height: 24px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundFive};
  border-radius: 999px;
`;

const Footer = styled.div`
  padding: 16px;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: max-content;
`;

const TopLine = styled.div`
  width: 34px;
  height: 8px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundSix};
  border-radius: 999px;
`;

const BottomLine = styled.div`
  width: 80px;
  height: 8px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundSix};
  border-radius: 999px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CardFront = () => {
  return (
    <Container>
      <Header>
        <Circle />
      </Header>

      <Body>
        <OvalsContainer>
          <Ovals>
            <Oval />
            <Oval />
            <Oval />
          </Ovals>
          <Ovals>
            <Oval />
            <Oval />
            <Oval />
          </Ovals>
          <Ovals>
            <Oval />
            <Oval />
            <Oval />
          </Ovals>
          <Ovals>
            <Oval />
            <Oval />
            <Oval />
          </Ovals>
        </OvalsContainer>
      </Body>

      <Footer>
        <Lines>
          <TopLine />
          <BottomLine />
        </Lines>
      </Footer>
    </Container>
  );
};
