import { Theme } from "@/signals/ui-signals";

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
  onboarded?: string;
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
