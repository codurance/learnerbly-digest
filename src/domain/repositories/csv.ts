export type CSVParserOptions = {
  delimiter: string;
  lineDelimiter: string;
};

export type CSVParserResult = {
  header: any[];
  rows: any[];
};

export interface ICSV {
  parse(data: string, config?: CSVParserOptions): CSVParserResult;
}
