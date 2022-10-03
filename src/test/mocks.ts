import { LearnerblyRecord } from "../domain/models/learnerbly-record";

export const CSV_RAW_CONTENT = `User ID,User Email,User First Name,User Last Name,Currency,Start Date,End Date,User Geographic Location,Total Budget Value,Total Spent,Budget Utilization
4ec682f4-0807-478d-9cf7-83a083c84768,some.one@codurance.com,SOME,ONE,GBP,"Jan 1, 2021","Jan 1, 2022",GB,300,100,33.33%
4ec682f4-0807-478d-9cf7-83a083c84769,other.person@codurance.com,OTHER,PERSON,GBP,"Jan 1, 2021","Jan 1, 2022",ES,300,200,66.66%
sdfasdfg-0807-478d-9cf7-weg23gsag423,some.one@codurance.com,SOME,ONE,GBP,"Jan 1, 2022","Jan 1, 2023",GB,300,150,50%
ewvasdge-0807-478d-9cf7-g23gewafrgwe,other.person@codurance.com,OTHER,PERSON,GBP,"Jan 1, 2022","Jan 1, 2023",ES,300,150,50%`;

export const LEARNERBLY_RECORDS: LearnerblyRecord[] = [
  {
    id: "0",
    email: "some.one@codurance.com",
    name: "SOME",
    surname: "ONE",
    currency: "GBP",
    timeFrame: "2021-2022",
    country: "GB",
    budget: 300,
    spent: 100,
    budgetUsage: 33.33,
  },
  {
    id: "1",
    email: "other.person@codurance.com",
    name: "OTHER",
    surname: "PERSON",
    currency: "GBP",
    timeFrame: "2021-2022",
    country: "ES",
    budget: 300,
    spent: 200,
    budgetUsage: 66.67,
  },
  {
    id: "2",
    email: "some.one@codurance.com",
    name: "SOME",
    surname: "ONE",
    currency: "GBP",
    timeFrame: "2022-2023",
    country: "GB",
    budget: 300,
    spent: 150,
    budgetUsage: 50,
  },
  {
    id: "3",
    email: "other.person@codurance.com",
    name: "OTHER",
    surname: "PERSON",
    currency: "GBP",
    timeFrame: "2022-2023",
    country: "ES",
    budget: 300,
    spent: 150,
    budgetUsage: 50,
  },
];

export const SPENT_STATS = [
  { segment: ["ES", "2021-2022"], value: 200 },
  { segment: ["ES", "2022-2023"], value: 150 },
  { segment: ["GB", "2021-2022"], value: 100 },
  { segment: ["GB", "2022-2023"], value: 150 },
];

export const BUDGET_USAGE_STATS = [
  { segment: ["ES", "2021-2022"], value: 66.67 },
  { segment: ["ES", "2022-2023"], value: 50 },
  { segment: ["GB", "2021-2022"], value: 33.33 },
  { segment: ["GB", "2022-2023"], value: 50 },
];

export const PARTITIONS = [
  { property: "country", segments: ["ES", "GB"] },
  { property: "timeFrame", segments: ["2021-2022", "2022-2023"] },
];

export const LEARNERBLY_STATS = {
  spent: {
    partitions: PARTITIONS,
    stats: SPENT_STATS,
  },
  budgetUsage: {
    partitions: PARTITIONS,
    stats: BUDGET_USAGE_STATS,
  },
};
export const FILE_NAME = "mock.csv";
export const DUMMY_FILE = new File([CSV_RAW_CONTENT], FILE_NAME, {
  type: "csv",
});

export const STORED_FILE = JSON.stringify({
  [FILE_NAME]: CSV_RAW_CONTENT,
});
