import { LearnerblyRecord } from "../domain/models/learnerbly-record";

export const CSV_RAW_CONTENT = `User ID,User Email,User First Name,User Last Name,Currency,Start Date,End Date,User Geographic Location,Total Budget Value,Total Spent,Budget Utilization
4ec682f4-0807-478d-9cf7-83a083c84768,some.one@codurance.com,SOME,ONE,GBP,"Jan 1, 2021","Jan 1, 2022",GB,300,247.8,82.6%
4ec682f4-0807-478d-9cf7-83a083c84768,other.person@codurance.com,OTHER,PERSON,GBP,"Jan 1, 2022","Jan 1, 2023",GB,300,188.13,62.71%`;

export const CSV_ROWS: LearnerblyRecord[] = [
  {
    id: "0",
    email: "some.one@codurance.com",
    name: "SOME",
    surname: "ONE",
    currency: "GBP",
    timeFrame: "2021-2022",
    country: "GB",
    budget: 300,
    spent: 247.8,
    budgetUsage: 82.6,
  },
  {
    id: "1",
    email: "other.person@codurance.com",
    name: "OTHER",
    surname: "PERSON",
    currency: "GBP",
    timeFrame: "2022-2023",
    country: "GB",
    budget: 300,
    spent: 188.13,
    budgetUsage: 62.71,
  },
];
