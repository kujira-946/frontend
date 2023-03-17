// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export type SagaAction<Payload> = {
  type: string;
  payload: Payload;
};

export type NullAction = SagaAction<null>;

export type IdAction = SagaAction<{ id: number }>;

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

export type UpdateUserData = Partial<RegistrationData>;

// ========================================================================================= //
// [ API RESPONSE ] ======================================================================== //
// ========================================================================================= //

type APIResponse<Data> = {
  data: { title?: string; body: string; footnote?: string; data?: Data };
};

export type RegistrationSuccess = APIResponse<number>;

export type APIError = { data: { body: string } };
