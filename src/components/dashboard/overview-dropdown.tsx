import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";
import { memo, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Global from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { fetchOverviewGroupPurchasesRequest } from "@/sagas/purchases.saga";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  borderRadius?: Types.PxAsRem;
  opened: boolean;
};

const Container = styled.section<ContainerProps>`
  border: ${(props: ThemeProps & ContainerProps) => {
    return props.opened
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${(props) => props.borderRadius || Styles.pxAsRem.six};
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

const Total = styled.h4`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled(motion.article)`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const PurchaseCells = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  children: React.ReactNode;
  borderRadius?: Types.PxAsRem;

  initiallyOpen: boolean;
  title: "Recurring" | "Incoming" | string;
  totalCost: number;
  purchaseCount: number;
  overviewGroupId?: number;

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteAllPurchases: () => void;
  addPurchase: () => void;
};

const ExportedComponent = (props: Props) => {
  console.log("Overview Dropdown Rendered");

  const dispatch = Functions.useAppDispatch();

  const { ui } = Functions.useSignalsStore();

  const opened = useSignal(props.initiallyOpen);

  useEffect(() => {
    if (props.overviewGroupId && opened.value) {
      dispatch(fetchOverviewGroupPurchasesRequest(props.overviewGroupId));
    }
  }, [props.overviewGroupId]);

  return (
    <Container borderRadius={props.borderRadius} opened={opened.value}>
      <Drag.DragDropContext onDragEnd={props.onDragEnd}>
        <Header
          onClick={() => (opened.value = !opened.value)}
          opened={opened.value}
        >
          <Title>
            {props.title} ({props.purchaseCount})
          </Title>
          <Total>${Functions.roundNumber(props.totalCost, 2)}</Total>
        </Header>

        <AnimatePresence>
          {opened.value && (
            <Body
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0, delay: 0 }}
            >
              <Drag.Droppable droppableId={Styles.overviewDropdownDroppableId}>
                {(
                  provided: Drag.DroppableProvided,
                  snapshot: Drag.DroppableStateSnapshot
                ) => {
                  return (
                    <PurchaseCells
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {props.children}
                    </PurchaseCells>
                  );
                }}
              </Drag.Droppable>

              <Global.Button
                type="button"
                onClick={props.deleteAllPurchases}
                size="medium"
                borderRadius="four"
                color={Styles.background[ui.theme.value].seven}
                hoverColor={Styles.background[ui.theme.value].eight}
                background={Styles.background[ui.theme.value].one}
                hoverBackground={Styles.background[ui.theme.value].three}
                border={Styles.background[ui.theme.value].seven}
                hoverBorder={Styles.background[ui.theme.value].eight}
              >
                Delete All
              </Global.Button>

              <Global.Button
                type="button"
                onClick={props.addPurchase}
                size="medium"
                borderRadius="four"
                color={Styles.background[ui.theme.value].eight}
                background={Styles.background[ui.theme.value].three}
                hoverBackground={Styles.background[ui.theme.value].five}
              >
                Add
              </Global.Button>
            </Body>
          )}
        </AnimatePresence>
      </Drag.DragDropContext>
    </Container>
  );
};

export const OverviewDropdown = memo(ExportedComponent);
