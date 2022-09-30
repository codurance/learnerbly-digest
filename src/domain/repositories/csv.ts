import { CSVParserOptions, CSVParserResult } from "../models/csv";

export interface ICSV {
  parse(data: string, config?: CSVParserOptions): CSVParserResult;
}
