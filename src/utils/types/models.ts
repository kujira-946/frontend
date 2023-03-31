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
  overviewIds: number[]; // has many overviews
  logbookIds: number[]; // has many logbooks
} & Dates;

export type Category = "need" | "planned" | "impulse" | "regret";
export type Purchase = {
  id: number;
  placement: number;
  category?: Category;
  description?: string;
  cost?: number;
  overviewGroupId?: number; // belongs to an overview group
  logbookEntryId?: number; // belongs to a logbook entry
} & Dates;

export type Overview = {
  id: number;
  income: number;
  savings: number;
  overviewGroupIds: number[]; // has many overview groups
  ownerId: number; // belongs to a user
} & Dates;

export type OverviewGroup = {
  id: number;
  name: string;
  totalCost: number;
  purchaseIds: number[]; // has many purchases
  overviewId: number; // belongs to an overview
} & Dates;

export type Logbook = {
  id: number;
  name: string;
  logbookEntryIds: number[]; // has many logbook entries
  ownerId: number; // belongs to a user
} & Dates;

export type LogbookEntry = {
  id: number;
  date: Date;
  spent: number;
  budget?: number;
  purchaseIds: number[]; // has many purchases
  logbookId: number; // belongs to a logbook
} & Dates;
