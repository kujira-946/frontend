import { motion } from "framer-motion";
import styled from "styled-components";

import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled(motion.article)`
  position: absolute;
  right: 0;
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
  padding: 10px 16px;
`;

const Block = styled.div`
  height: 40px;
  background-color: ${(props: ThemeProps) => props.theme.primaryMain};
`;

const Circle = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundFive};
  border-radius: 999px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 16px 60px;
`;

const Square = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundSix};
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  width: max-content;
`;

const TopLine = styled.div`
  width: 80px;
  height: 8px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundSix};
  border-radius: 999px;
  margin-right: 12px;
`;

const BottomLine = styled.div`
  width: 120px;
  height: 8px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundSix};
  border-radius: 999px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CardBack = () => {
  return (
    <Container
      initial={{
        opacity: 0,
        transform: "rotate(0deg) translateX(0px) translateY(-20%)",
      }}
      animate={{
        opacity: 1,
        transform: "rotate(-15deg) translateX(-10px) translateY(-78%)",
      }}
      transition={{ duration: 0.3, delay: 1.5 }}
    >
      <Header>
        <Circle />
      </Header>

      <Block />

      <Body>
        <Lines>
          <TopLine />
          <BottomLine />
        </Lines>
        <Square />
      </Body>
    </Container>
  );
};
