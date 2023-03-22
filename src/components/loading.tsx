import styled, { css, keyframes } from "styled-components";

import * as Styles from "@/utils/styles";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Styles.pxAsRem.four};
  background-color: ${Styles.overlay};
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const rotation = keyframes`
    from { transform: rotate(0deg) };
    to { transform: rotate(360deg) };
`;
const ringStyles = css`
  position: absolute;
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-color: #fff transparent transparent transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${rotation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
`;

const RingOne = styled.div`
  ${ringStyles};
  animation-delay: -0.45s;
`;

const RingTwo = styled.div`
  ${ringStyles};
  animation-delay: -0.3s;
`;

const RingThree = styled.div`
  ${ringStyles};
  animation-delay: -0.15s;
`;

const Text = styled.p`
  margin: 0;
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.medium};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = { text?: string };

export const Loading = (props: Props) => {
  return (
    <Container>
      <Spinner>
        <RingOne />
        <RingTwo />
        <RingThree />
      </Spinner>
      <Text>{props.text}</Text>
    </Container>
  );
};
