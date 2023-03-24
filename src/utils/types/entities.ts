type Theme = "light" | "dark";

type Dates = {
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  currency: string;
  mobileNumber?: string;
  theme: Theme;
  onboarded: boolean;
  emailVerified: boolean;
  loggedIn: boolean;
  signedVerificationCode?: string;
  overview: Overview[];
  logbooks: Logbook[];
} & Dates;

type Category = "need" | "planned" | "impulse" | "regret";
export type Purchase = {
  id: number;
  placement: number;
  category?: Category;
  description?: string;
  cost?: number;
  overviewGroup?: OverviewGroup;
  logbookEntry?: LogbookEntry;
} & Dates;

export type Overview = {
  id: number;
  income: number;
  savings: number;
  groups: OverviewGroup[];
  ownerId: number;
} & Dates;

export type OverviewGroup = {
  id: number;
  name: string;
  totalCost: number;
  purchases: Purchase[];
  overviewId: number;
} & Dates;

export type Logbook = {
  id: number;
  name: string;
  entries: LogbookEntry[];
  ownerId: number;
} & Dates;

export type LogbookEntry = {
  id: number;
  date: Date;
  spent: number;
  budget?: number;
  purchases: Purchase[];
  logbookId: number;
} & Dates;
