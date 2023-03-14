import { ChangeEvent, FormEvent } from "react";
import { pxAsRem } from "./sizes";

// ↓↓↓ Form ↓↓↓ //

export type Input = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = FormEvent<HTMLFormElement>;

// ↓↓↓ Logbook ↓↓↓ //

export type Category = "Need" | "Planned" | "Impulse" | "Regret";

export type Purchase = {
  description: string;
  cost: string;
};

// ↓↓↓ SVG ↓↓↓ //

export type SVGProps = {
  height: number;
  fill: string;
  hovered?: boolean;
  hoveredFill?: string;
};

// ↓↓↓ Styles ↓↓↓ //

export type PxAsRem = keyof typeof pxAsRem;

// ↓↓↓ Sagas ↓↓↓ //

export type SagaAction<Payload> = {
  type: string;
  payload: Payload;
};

export type NullAction = SagaAction<null>;
export type IdAction = SagaAction<{ id: number }>;

// ↓↓↓ API Data ↓↓↓ //

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
