import styled, { css } from "styled-components";
import { memo, useCallback, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as Sagas from "@/sagas";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

import { OverviewHeader } from "./overview-header";
import { LogbookEntryHeader } from "./logbook-entry-header";
import { PurchaseCells } from "./purchase-cells";
import { OverviewPurchases } from "./overview-purchases";
import { LogbookEntryPurchases } from "./logbook-entry-purchases";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { open: boolean };

const Container = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
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
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.twelve};
  border-top: ${(props: ThemeProps) => {
    return `${props.theme.backgroundFour} solid 1px`;
  }};
`;

const buttonStyles = css`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.fourteen};
  border-radius: ${Styles.pxAsRem.six};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const DeleteButton = styled.button`
  ${buttonStyles};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  border: ${(props: ThemeProps) => `${props.theme.backgroundSix} solid 1px`};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.backgroundTen};
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
  title?: string;
  associationId: number; // overview group or logbook entry id
  associationTotalSpent: number; // overview group or logbook entry total spent
  purchases: Types.Purchase[] | undefined;
  purchaseIds: number[];

  deleteSelectedPurchases?: (
    purchaseIds: number[],
    associationId: number
  ) => void;
  deleteAllPurchases: (purchaseIds: number[], associationId: number) => void;
  addPurchase: (associationId: number) => void;

  startOpened?: boolean;
};

type PurchaseIds = { [key: string]: number };

const ExportedComponent = (props: Props) => {
  console.log("Purchase dropdown rendered");

  const dispatch = Functions.useAppDispatch();

  const open = useSignal(!!props.startOpened);
  const selectedPurchases = useSignal<PurchaseIds>({});
  const purchasesSelected = useSignal(false);

  const selectPurchase = useCallback((purchaseId: number): void => {
    if (selectedPurchases.value[purchaseId]) {
      delete selectedPurchases.value[purchaseId];
      if (Object.values(selectedPurchases.value).length === 0) {
        purchasesSelected.value = false;
      }
    } else {
      selectedPurchases.value[purchaseId] = purchaseId;
      purchasesSelected.value = true;
    }
  }, []);

  function deleteSelectedPurchases(): void {
    if (props.deleteSelectedPurchases) {
      props.deleteSelectedPurchases(
        Object.values(selectedPurchases.value),
        props.associationId
      );
    }
  }

  const setPurchaseCategory = useCallback(
    (purchaseId: number, category: Types.Category): void => {
      dispatch(Sagas.updatePurchaseRequest(purchaseId, { category }));
    },
    []
  );

  const updatePurchase = useCallback(
    Functions.debounce(
      (
        purchaseId: number,
        purchaseDescription: string,
        purchaseCost: number,
        description: string,
        cost: string
      ): void => {
        return Functions.updatePurchase(
          purchaseId,
          purchaseDescription,
          purchaseCost,
          description,
          cost,
          props.type === "overview" ? "overviewGroup" : "logbookEntry",
          props.associationId,
          props.associationTotalSpent,
          dispatch
        );
      }
    ),
    [props.associationTotalSpent]
  );

  const deletePurchase = useCallback(
    (purchaseId: number, purchaseCost: number): void => {
      return Functions.deletePurchase(
        purchaseId,
        purchaseCost,
        props.type === "overview" ? "overviewGroup" : "logbookEntry",
        props.associationId,
        props.associationTotalSpent,
        dispatch
      );
    },
    [props.associationTotalSpent]
  );

  // ↓↓↓ Fetching associated purchases (overview group / logbook entry) ↓↓↓ //
  useEffect(() => {
    if (open.value) {
      if (props.type === "overview") {
        dispatch(Sagas.fetchOverviewGroupPurchasesRequest(props.associationId));
      } else {
        dispatch(Sagas.fetchLogbookEntryPurchasesRequest(props.associationId));
      }
    }
  }, [open.value]);

  return (
    <Container open={open.value}>
      <Header
        type="button"
        onClick={() => (open.value = !open.value)}
        open={open.value}
      >
        {props.type === "overview" && props.title ? (
          <OverviewHeader
            title={props.title}
            totalSpent={props.associationTotalSpent}
          />
        ) : (
          <LogbookEntryHeader logbookEntryId={props.associationId} />
        )}
      </Header>

      <AnimatePresence>
        {open.value && (
          <Body>
            {!props.purchases ? (
              <PurchaseCells updatingPurchases={false}>
                <Globals.PurchaseShimmer borderRadius="six" />
                <Globals.PurchaseShimmer borderRadius="six" />
                <Globals.PurchaseShimmer borderRadius="six" />
              </PurchaseCells>
            ) : (
              props.purchases.length > 0 &&
              (props.type === "overview" ? (
                <OverviewPurchases
                  purchases={props.purchases}
                  updatePurchase={updatePurchase}
                  deletePurchase={deletePurchase}
                />
              ) : (
                <LogbookEntryPurchases
                  purchases={props.purchases}
                  selectPurchase={selectPurchase}
                  setPurchaseCategory={setPurchaseCategory}
                  updatePurchase={updatePurchase}
                  deletePurchase={deletePurchase}
                />
              ))
            )}

            <Buttons>
              {props.deleteSelectedPurchases && purchasesSelected.value && (
                <DeleteButton type="button" onClick={deleteSelectedPurchases}>
                  Delete Selected
                </DeleteButton>
              )}

              <DeleteButton
                type="button"
                onClick={() => {
                  props.deleteAllPurchases(
                    props.purchaseIds,
                    props.associationId
                  );
                }}
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

export const PurchaseDropdown = memo(ExportedComponent);
