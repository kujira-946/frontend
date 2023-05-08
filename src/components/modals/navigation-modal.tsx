import { useRouter } from "next/router";

import * as Types from "@/utils/types";
import { FilterButton } from "@/components/buttons";
import { useSignalsStore } from "@/utils/functions";
import { ClientRoutes } from "@/utils/constants";

import { MobileMenuModal } from "./mobile-menu-modal";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
};

export const NavigationModal = (props: Props) => {
  const router = useRouter();

  const { mobileMenuOpen } = useSignalsStore().dashboard;

  function sendToPage(page: Types.DashboardPage): void {
    if (page === "Logbooks") router.push(ClientRoutes.LOGBOOKS);
    else if (page === "Reviews") router.push(ClientRoutes.REVIEWS);
    else router.push(ClientRoutes.SETTINGS);
    mobileMenuOpen.value = false;
  }

  return (
    <MobileMenuModal page="Navigation">
      <FilterButton
        key="dashboard-mobile-navigation-modal-logbooks-filter-button"
        type="button"
        onClick={() => sendToPage("Logbooks")}
        size="medium"
        selected={props.page === "Logbooks"}
        inModal
      >
        Logbooks
      </FilterButton>

      <FilterButton
        key="dashboard-mobile-navigation-modal-reviews-filter-button"
        type="button"
        onClick={() => sendToPage("Reviews")}
        size="medium"
        selected={props.page === "Reviews"}
        inModal
      >
        Reviews
      </FilterButton>

      <FilterButton
        key="dashboard-mobile-navigation-modal-settings-filter-button"
        type="button"
        onClick={() => sendToPage("Settings")}
        size="medium"
        selected={props.page === "Settings"}
        inModal
      >
        Settings
      </FilterButton>
    </MobileMenuModal>
  );
};
