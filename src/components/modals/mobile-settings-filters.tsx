import * as Types from "@/utils/types";
import { dashboardSettingsTabs } from "@/components/dashboard/settings-sidebar";
import { FilterButton } from "@/components/buttons";
import { useSignalsStore } from "@/utils/functions";

import { MobileMenuModal } from "./mobile-menu-modal";

export const MobileSettingsFilters = () => {
  const { mobileFiltersOpen, currentSettingsTab } = useSignalsStore().dashboard;

  function setSettingsTab(settingsTab: Types.DashboardSettingsTab): void {
    currentSettingsTab.value = settingsTab;
    mobileFiltersOpen.value = false;
  }

  return (
    <MobileMenuModal
      page="Settings"
      caption="Navigate your settings below."
      closeAction={() => (mobileFiltersOpen.value = false)}
    >
      {dashboardSettingsTabs.map(
        (page: Types.DashboardSettingsTab, index: number) => {
          return (
            <FilterButton
              key={`dashboard-mobile-settings-filter-modal-${page}-${index}`}
              type="button"
              onClick={() => setSettingsTab(page)}
              size="medium"
              selected={currentSettingsTab.value === page}
              inModal
            >
              {page}
            </FilterButton>
          );
        }
      )}
    </MobileMenuModal>
  );
};
