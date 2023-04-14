import { Theme } from "@/signals/ui.signals";

import { Category } from "./models";

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export type SagaAction<Payload> = {
  type: string;
  payload: Payload;
};
export type NullAction = SagaAction<null>;

// ========================================================================================= //
// [ AUTH DATA ] =========================================================================== //
// ========================================================================================= //

export type RegistrationData = {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  currency?: string;
  mobileNumber?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type VerificationData = {
  email: string;
  verificationCode: string;
  thirtyDays?: boolean;
};

// ========================================================================================= //
// [ USERS DATA ] ========================================================================== //
// ========================================================================================= //

export type UserUpdateData = {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  currency?: string;
  mobileNumber?: string;
  onboarded?: boolean;
  theme?: Theme;
};

// ========================================================================================= //
// [ OVERVIEWS DATA ] ====================================================================== //
// ========================================================================================= //

export type OverviewCreateData = {
  income: number;
  savings?: number;
  ownerId: number;
};

export type OverviewUpdateData = {
  income?: number;
  savings?: number;
};

// ========================================================================================= //
// [ OVERVIEW GROUPS DATA ] ================================================================ //
// ========================================================================================= //

export type OverviewGroupCreateData = {
  name: string;
  totalSpent?: number;
  overviewId: number;
};

export type OverviewGroupUpdateData = Partial<OverviewGroupCreateData>;

// ========================================================================================= //
// [ LOGBOOKS DATA ] ======================================================================= //
// ========================================================================================= //

export type LogbookCreateData = {
  name: string;
  ownerId: number;
};

export type LogbookUpdateData = {
  name?: string;
};

// ========================================================================================= //
// [ LOGBOOK ENTRIES DATA ] ================================================================ //
// ========================================================================================= //

export type LogbookEntryCreateData = {
  date: string;
  totalSpent?: number;
  budget?: number | null;
  logbookId: number;
};

export type LogbookEntryUpdateData = Partial<LogbookEntryCreateData>;

// ========================================================================================= //
// [ PURCHASES DATA ] ====================================================================== //
// ========================================================================================= //

export type PurchaseCreateData = {
  placement: number;
  category?: Category;
  description?: string;
  cost?: number;
  overviewGroupId?: number;
  logbookEntryId?: number;
};

export type PurchaseUpdateData = Partial<PurchaseCreateData>;
