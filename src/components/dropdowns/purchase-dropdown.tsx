import styled, { css } from "styled-components";
import { useCallback } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";

import { OverviewHeader } from "./overview-header";
import { LogbookHeader } from "./logbook-header";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { open: boolean };

const Container = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.open
      ? `${props.theme.backgroundEight} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;
`;

type HeaderProps = { open: boolean };

const Header = styled.button<HeaderProps>`
  ${Styles.clearButton};
  border-bottom: ${(props: HeaderProps & ThemeProps) => {
    return props.open
      ? `${props.theme.backgroundFour} solid 1px`
      : "transparent solid 1px";
  }};
`;

const Body = styled(motion.div)`
  padding: 0 ${Styles.pxAsRem.twelve};
`;

const PurchaseCells = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.twelve};
`;

const Buttons = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  margin-bottom: ${Styles.pxAsRem.twelve};
`;

const buttonStyles = css`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.fourteen};
  border-radius: ${Styles.pxAsRem.six};
`;

const DeleteButton = styled.button`
  ${buttonStyles};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  border: ${(props: ThemeProps) => `${props.theme.backgroundSix} solid 1px`};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      border: ${(props: ThemeProps) => {
        return `${props.theme.backgroundEight} solid 1px;`;
      }};
    }
  }
`;

const AddButton = styled.button`
  ${buttonStyles};
  color: ${(props: ThemeProps) => props.theme.backgroundNine};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      background-color: ${(props: ThemeProps) => props.theme.backgroundFour};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  type: "overview" | "logbook";
  title: string;
  totalSpent: number;
  associationId: number; // overview group or logbook entry
  deleteSelectedPurchases: (purchaseIds: number[]) => void;
  deleteAllPurchases: (associationId: number) => void;
  addPurchase: (associationId: number) => void;
  startOpened?: true;
  children: React.ReactNode;
};

type PurchaseIds = { [key: string]: number };

export const PurchaseDropdown = (props: Props) => {
  const open = useSignal(props.startOpened || false);
  const selectedPurchases = useSignal<PurchaseIds>({});

  const selectPurchase = useCallback((purchaseId: number): void => {
    if (selectedPurchases.value[purchaseId]) {
      delete selectedPurchases.value[purchaseId];
    } else {
      selectedPurchases.value[purchaseId] = purchaseId;
    }
  }, []);

  return (
    <Container open={open.value}>
      <Header
        type="button"
        onClick={() => (open.value = !open.value)}
        open={open.value}
      >
        {props.type === "overview" ? (
          <OverviewHeader title={props.title} totalSpent={props.totalSpent} />
        ) : (
          <LogbookHeader />
        )}
      </Header>

      <AnimatePresence>
        {open.value && (
          <Body>
            <PurchaseCells>{props.children}</PurchaseCells>

            <Buttons>
              {Object.keys(selectedPurchases.value).length > 0 && (
                <DeleteButton
                  type="button"
                  onClick={() =>
                    props.deleteSelectedPurchases(
                      Object.values(selectedPurchases.value)
                    )
                  }
                >
                  Delete Selected
                </DeleteButton>
              )}

              <DeleteButton
                type="button"
                onClick={() => props.deleteAllPurchases(props.associationId)}
              >
                Delete All
              </DeleteButton>

              <AddButton
                type="button"
                onClick={() => props.addPurchase(props.associationId)}
              >
                Add
              </AddButton>
            </Buttons>
          </Body>
        )}
      </AnimatePresence>
    </Container>
  );
};
