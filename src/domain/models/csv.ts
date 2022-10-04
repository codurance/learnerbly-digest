export type CSVParserOptions = {
  delimiter: string;
  lineDelimiter: string;
};

export type CSVParserResult = {
  header: any[];
  rows: any[];
};

export type StoredFile = {
  name: string;
  content: string;
};
