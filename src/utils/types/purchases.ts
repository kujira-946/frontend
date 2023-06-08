export type UpdatePurchase = (
  purchaseId: number,
  purchaseDescription: string,
  purchaseCost: number,
  updatedDescription: string,
  updatedCost: string
) => void;

export type DeletePurchase = (purchaseId: number) => void;
