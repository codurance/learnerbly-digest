export type CSVParserOptions = {
  delimiter: string;
  lineDelimiter: string;
};

export type CSVParserResult = {
  header: any[];
  rows: any[];
};
