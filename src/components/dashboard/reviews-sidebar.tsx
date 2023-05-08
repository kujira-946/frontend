import styled from "styled-components";
import { Fragment } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { monthsAsNumber } from "@/utils/constants";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { expanded: boolean };

const Container = styled.article<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => {
    return props.expanded ? `${Styles.widths.dashboardSidebar}px` : "auto";
  }};
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const FilterButtons = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${Styles.pxAsRem.twelve};
  overflow-y: auto;
`;

const ToggleButton = styled(Globals.IconButton)`
  margin: 0 ${Styles.pxAsRem.twelve} ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

type SmallFilterButtonProps = {
  selected: boolean;
};

const SmallFilterButton = styled.button<SmallFilterButtonProps>`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${Styles.pxAsRem.forty};
  height: ${Styles.pxAsRem.forty};
  color: ${(props: SmallFilterButtonProps & ThemeProps) => {
    return props.selected ? props.theme.text : props.theme.backgroundEight;
  }};
  background-color: ${(props: SmallFilterButtonProps & ThemeProps) => {
    return props.selected
      ? props.theme.backgroundFour
      : props.theme.backgroundTwo;
  }};
  border-radius: ${Styles.pxAsRem.six};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};

  @media (hover: hover) {
    :hover {
      color: ${(props: SmallFilterButtonProps & ThemeProps) => {
        return props.selected ? props.theme.text : props.theme.backgroundEight;
      }};
      background-color: ${(props: SmallFilterButtonProps & ThemeProps) => {
        return props.selected
          ? props.theme.backgroundFour
          : props.theme.backgroundThree;
      }};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const ReviewsSidebar = () => {
  const { theme } = Functions.useSignalsStore().ui;
  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const logbooks = Functions.useGetUserLogbooks();

  const sidebarExpanded = useSignal(true);

  return (
    <Container expanded={sidebarExpanded.value}>
      {sidebarExpanded.value && (
        <DashboardSidebarHeader
          page="Reviews"
          caption="Select a logbook below to review your purchasing habits."
          standalone
        />
      )}

      {logbooks && (
        <FilterButtons>
          {logbooks.map((logbook: Types.Logbook, index: number) => {
            return (
              <Fragment
                key={`dashboard-reviews-sidebar-filter-button-${logbook.id}-${index}`}
              >
                {sidebarExpanded.value ? (
                  <Globals.FilterButton
                    type="button"
                    onClick={() => (selectedLogbookId.value = logbook.id)}
                    size="medium"
                    borderRadius="six"
                    selected={selectedLogbookId.value === logbook.id}
                  >
                    {logbook.name}
                  </Globals.FilterButton>
                ) : (
                  <SmallFilterButton
                    type="button"
                    onClick={() => (selectedLogbookId.value = logbook.id)}
                    selected={selectedLogbookId.value === logbook.id}
                  >
                    {monthsAsNumber[new Date(logbook.createdAt).getMonth()]}
                  </SmallFilterButton>
                )}
              </Fragment>
            );
          })}
        </FilterButtons>
      )}

      {theme.value &&
        (sidebarExpanded.value ? (
          <ToggleButton onClick={() => (sidebarExpanded.value = false)}>
            <Icons.SidebarCollapse
              width={14}
              height={14}
              fill={Styles.background[theme.value].eight}
              addHover
            />
          </ToggleButton>
        ) : (
          <ToggleButton onClick={() => (sidebarExpanded.value = true)}>
            <Icons.SidebarExpand
              width={14}
              height={14}
              fill={Styles.background[theme.value].eight}
              addHover
            />
          </ToggleButton>
        ))}
    </Container>
  );
};
