import styled from "styled-components";
import { useCallback } from "react";

import * as Styles from "@/utils/styles";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { FilterButton } from "@/components/buttons";
import { useSignalsStore } from "@/utils/functions";

import { MobileMenuModal } from "./mobile-menu-modal";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  border: red solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const MobileLogbookFilters = () => {
  const { mobileFiltersOpen, selectedLogbookId } = useSignalsStore().dashboard;

  const logbooks = Functions.useGetUserLogbooks();

  const selectLogbook = useCallback((logbookId: number): void => {
    selectedLogbookId.value = logbookId;
    mobileFiltersOpen.value = false;
  }, []);

  return (
    <MobileMenuModal
      page="Logbooks Filter"
      caption="Select a logbook below."
      closeAction={() => (mobileFiltersOpen.value = false)}
    >
      {logbooks &&
        logbooks.map((logbook: Types.Logbook, index: number) => {
          return (
            <FilterButton
              key={`dashboard-mobile-logbook-filter-modal-${logbook.id}-${index}`}
              type="button"
              onClick={() => selectLogbook(logbook.id)}
              size="medium"
              selected={selectedLogbookId.value === logbook.id}
              inModal
            >
              {logbook.name}
            </FilterButton>
          );
        })}
    </MobileMenuModal>
  );
};
