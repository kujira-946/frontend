import styled from "styled-components";
import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";
import { motion } from "framer-motion";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Parent = styled(motion.section)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${Styles.pxAsRem.twelve};
  ${Styles.overlay};
`;

const Child = styled.article`
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-radius: ${Styles.pxAsRem.six};
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  padding: ${Styles.pxAsRem.twelve};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const TitleAndCaption = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Caption = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundTen};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};
`;

const FilterButtons = styled.div`
  display: flex;
  padding: ${Styles.pxAsRem.twelve};
`;

type FilterButtonProps = { selected: boolean };

const FilterButton = styled(Globals.Button)<FilterButtonProps>`
  justify-content: flex-start;
  color: ${(props: FilterButtonProps & ThemeProps) => {
    return props.selected ? props.theme.text : props.theme.backgroundEight;
  }};
  background-color: ${(props: FilterButtonProps & ThemeProps) => {
    return props.selected
      ? props.theme.backgroundThree
      : props.theme.backgroundOne;
  }};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  open: Signal<boolean>;
  selectedLogbookId: Signal<number | null>;
};

export const LogbooksFiltersModal = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  const logbooks = Functions.useGetUserLogbooks();

  return (
    <Parent
      onClick={() => (props.open.value = false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <Child onClick={(event: Types.OnClick) => event.stopPropagation()}>
        <Header>
          <TitleAndCaption>
            <Title>Logbooks Filter</Title>
            <Caption>Select a logbook below.</Caption>
          </TitleAndCaption>

          {theme.value && (
            <Globals.IconContainer onClick={() => (props.open.value = false)}>
              <Icons.Close
                width={14}
                height={14}
                fill={Styles.background[theme.value].ten}
                hoveredFill={Styles.text[theme.value]}
                addHover
              />
            </Globals.IconContainer>
          )}
        </Header>

        {theme.value && logbooks && (
          <FilterButtons>
            {logbooks.map((logbook: Types.Logbook, index: number) => {
              return (
                <FilterButton
                  key={`logbooks-filters-modals-filter-button-${logbook.id}-${index}`}
                  type="button"
                  onClick={() => (props.selectedLogbookId.value = logbook.id)}
                  size="medium"
                  borderRadius="six"
                  selected={props.selectedLogbookId.value === logbook.id}
                >
                  {logbook.name}
                </FilterButton>
              );
            })}
          </FilterButtons>
        )}
      </Child>
    </Parent>
  );
};