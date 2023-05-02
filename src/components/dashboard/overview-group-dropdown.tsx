import * as Drag from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { memo, useCallback, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  borderRadius?: Types.PxAsRem;
  opened: boolean;
};

const Container = styled.section<ContainerProps>`
  ${Styles.transition};
  position: relative;
  width: 100%;
  border: ${(props: ThemeProps & ContainerProps) => {
    return props.opened
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.six;
  }};
  overflow-y: auto;

  @media (hover: hover) {
    :hover {
      border: ${(props: ThemeProps) => {
        return `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }
`;

type HeaderProps = { opened: boolean };

const Header = styled.header<HeaderProps>`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps & HeaderProps) => {
    return props.opened
      ? `${props.theme.backgroundFour} solid 1px`
      : `transparent solid 1px`;
  }};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Total = styled.h3`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicDeleteConfirmation = dynamic(() =>
  import("../modals/delete-confirmation").then((mod) => mod.DeleteConfirmation)
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius?: Types.PxAsRem;
  overviewGroupId: number;

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteAllPurchases: (overviewGroupId: number) => void;
  addPurchase: (overviewGroupId: number) => void;

  initiallyOpen?: true;
};

const ExportedComponent = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { purchases } = Functions.useEntitiesSlice();
  const overviewGroup = Functions.useGetOverviewGroup(props.overviewGroupId);
  const overviewGroupPurchases = Functions.useGetOverviewGroupPurchases(
    props.overviewGroupId
  );

  const opened = useSignal(!!props.initiallyOpen);
  const loadingPurchases = useSignal(false);
  const deleteConfirmationOpen = useSignal(false);

  const updatePurchase = useCallback(
    Functions.debounce(
      (purchaseId: number, description: string, cost: string) => {
        if (overviewGroup && purchases && purchases[purchaseId]) {
          Functions.updatePurchase(
            purchases[purchaseId],
            description,
            cost,
            "overviewGroup",
            overviewGroup.id,
            overviewGroup.totalSpent,
            dispatch
          );
        }
      }
    ),
    [overviewGroup, purchases]
  );

  const deletePurchase = useCallback(
    (purchaseId: number) => {
      if (overviewGroup && purchases && purchases[purchaseId]) {
        return Functions.deletePurchase(
          purchases[purchaseId],
          "overviewGroup",
          overviewGroup.id,
          overviewGroup.totalSpent,
          dispatch
        );
      }
    },
    [overviewGroup, purchases]
  );

  useEffect(() => {
    if (opened.value && !overviewGroupPurchases) {
      loadingPurchases.value = true;
      dispatch(
        PurchasesSagas.fetchOverviewGroupPurchasesRequest(props.overviewGroupId)
      );
    } else if (loadingPurchases.value && overviewGroupPurchases) {
      loadingPurchases.value = false;
    }
  }, [opened.value, overviewGroupPurchases]);

  return (
    <Container borderRadius={props.borderRadius} opened={opened.value}>
      <AnimatePresence>
        {deleteConfirmationOpen.value && (
          <DynamicDeleteConfirmation
            title="Delete all purchases for this group?"
            open={deleteConfirmationOpen}
            onClose={() => (deleteConfirmationOpen.value = false)}
            onConfirm={() => props.deleteAllPurchases(props.overviewGroupId)}
          />
        )}
      </AnimatePresence>

      <Header
        onClick={() => (opened.value = !opened.value)}
        opened={opened.value}
      >
        <Title>
          {overviewGroup && overviewGroup.name}{" "}
          {overviewGroup?.purchaseIds &&
            overviewGroup.purchaseIds.length > 0 &&
            `(${overviewGroup.purchaseIds.length})`}
        </Title>
        <Total>
          ${Functions.roundNumber(overviewGroup?.totalSpent || 0, 2)}
        </Total>
      </Header>

      <AnimatePresence>
        {opened.value && (
          <Drag.DragDropContext onDragEnd={props.onDragEnd}>
            <Body>
              {overviewGroupPurchases && overviewGroupPurchases.length > 0 && (
                <>
                  <Globals.DropdownPurchases
                    type="Overview Groups"
                    opened={opened.value}
                    loadingPurchases={loadingPurchases.value}
                    purchases={overviewGroupPurchases}
                    onDragEnd={props.onDragEnd}
                    update={updatePurchase}
                    delete={deletePurchase}
                    hideCheck
                    hideCategories
                  />
                  <Globals.NeutralButtonOutlined
                    onClick={() => (deleteConfirmationOpen.value = true)}
                    size="medium"
                  >
                    Delete All
                  </Globals.NeutralButtonOutlined>
                </>
              )}

              <Globals.NeutralButton
                onClick={() => props.addPurchase(props.overviewGroupId)}
                size="medium"
                borderRadius="four"
              >
                Add
              </Globals.NeutralButton>
            </Body>
          </Drag.DragDropContext>
        )}
      </AnimatePresence>
    </Container>
  );
};

export const OverviewGroupDropdown = memo(ExportedComponent);
