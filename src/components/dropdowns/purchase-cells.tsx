import styled, { css } from "styled-components";

import * as Styles from "@/utils/styles";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type PurchaseCellsProps = { updatingPurchases: boolean };

const Container = styled.article<PurchaseCellsProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.twelve};
  max-height: 400px;
  overflow-y: auto;

  ${(props) =>
    props.updatingPurchases &&
    css`
      ${Styles.preventUserInteraction};
      opacity: 0.5;
    `};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = { children: React.ReactNode } & PurchaseCellsProps;

export const PurchaseCells = (props: Props) => {
  return (
    <Container updatingPurchases={props.updatingPurchases}>
      {props.children}
    </Container>
  );
};
