import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";

type Props = {
  purchasesSelected: boolean;
  selectedPurchaseIds: { [key: string]: number };
  confirmPurchasesDelete: Signal<boolean>;
  logbookEntryId: number;

  deleteSelectedPurchases: (logbookEntryIds: number[]) => void;
  addPurchase: (logbookEntryId: number) => void;
};

export const LogbookEntryDropdownButtons = (props: Props) => {
  return (
    <>
      {props.purchasesSelected && (
        <Globals.NeutralButtonOutlined
          onClick={() =>
            props.deleteSelectedPurchases(
              Object.values(props.selectedPurchaseIds)
            )
          }
          size="medium"
          borderRadius="four"
        >
          Delete Selected
        </Globals.NeutralButtonOutlined>
      )}

      <Globals.NeutralButtonOutlined
        onClick={() => (props.confirmPurchasesDelete.value = true)}
        size="medium"
        borderRadius="four"
      >
        Delete All
      </Globals.NeutralButtonOutlined>

      <Globals.NeutralButton
        onClick={() => props.addPurchase(props.logbookEntryId)}
        size="medium"
        borderRadius="four"
      >
        Add
      </Globals.NeutralButton>
    </>
  );
};
