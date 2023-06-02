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
  overviewId: number; // one to one
  logbookIds: number[]; // has many logbooks
  bugReportIds: number[]; // has many bug reports
} & Dates;

export type Category = "monthly" | "need" | "planned" | "impulse" | "regret";
export type Purchase = {
  id: number;
  placement: number;
  category: Category | null;
  description: string;
  cost: number | null;
  overviewGroupId?: number; // belongs to an overview group
  logbookEntryId?: number; // belongs to a logbook entry
} & Dates;

export type Overview = {
  id: number;
  income: number;
  savings: number;
  ownerId: number; // one to one with a user
  overviewGroupIds: number[]; // has many overview groups
} & Dates;

export type OverviewGroup = {
  id: number;
  name: string;
  totalSpent: number;
  purchaseIds?: number[]; // has many purchases
  overviewId: number; // belongs to an overview
} & Dates;

export type Logbook = {
  id: number;
  name: string;
  logbookEntryIds?: number[]; // has many logbook entries
  ownerId: number; // belongs to a user
} & Dates;

export type LogbookEntry = {
  id: number;
  date: string;
  totalSpent: number;
  budget: number | null;
  purchaseIds?: number[]; // has many purchases
  logbookId: number; // belongs to a logbook
} & Dates;

export type BugReport = {
  id: number;
  title: string;
  body: string | null;
  ownerId: number; // belongs to a user
} & Dates;
