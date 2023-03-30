export type OnboardingPurchase = {
  placement?: number;
  description: string;
  cost: string;
};

export type OnboardingOverviewGroup = {
  name: string;
  totalCost: number;
};
