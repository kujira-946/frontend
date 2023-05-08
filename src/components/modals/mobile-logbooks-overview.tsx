import * as Dashboard from "@/components/dashboard";
import * as Functions from "@/utils/functions";

import { MobileMenuModal } from "./mobile-menu-modal";

export const MobileLogbooksOverview = () => {
  const { mobileOverviewOpen } = Functions.useSignalsStore().dashboard;

  return (
    <MobileMenuModal
      page="Your Overview"
      closeAction={() => (mobileOverviewOpen.value = false)}
      noHeader
    >
      <Dashboard.LogbooksUserSummary inModal />
      <Dashboard.LogbookOverviewGroups />
    </MobileMenuModal>
  );
};
