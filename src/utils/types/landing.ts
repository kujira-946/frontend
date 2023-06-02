import { Signal } from "@preact/signals-react";

export type LandingProps = {
  totalSpent: Signal<string>;
  remainingBudget: Signal<string>;
};
