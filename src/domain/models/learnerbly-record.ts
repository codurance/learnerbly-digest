export type LearnerblyRecord = Record<string, any> & {
  id: string;
  email: string;
  name: string;
  surname: string;
  currency: string;
  timeFrame: string;
  country: string;
  budget: number;
  spent: number;
  budgetUsage: number;
};
