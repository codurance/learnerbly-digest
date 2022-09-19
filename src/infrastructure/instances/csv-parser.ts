import { curry } from "@typed/curry";

import { CSVParserOptions, ICSV } from "../../domain/repositories/csv";

const defaultParserConfig: CSVParserOptions = {
  lineDelimiter: "\n",
  delimiter: ",",
};

export const CSV = (): ICSV => ({
  parse(csv, config = defaultParserConfig) {
    const lines = csv.split(config.lineDelimiter);
    const matcher = createMatcher(config);
    const header = getLineValues(matcher, lines[0]);
    const rows = lines
      .slice(1)
      .map(getLineValues(matcher))
      .map(lineValuesToObject(header));

    return { header, rows };
  },
});

function lineValuesToObject(header: string[]) {
  return (row: string[]) =>
    header.reduce((acc, attr, i) => {
      acc[attr] = row[i];
      return acc;
    }, {} as Record<string, string>);
}

function createMatcher(config: CSVParserOptions) {
  const d = config.delimiter;
  return RegExp(`"([^${d}"]*,[^${d}"]*)"|([^${d}]+)`, "g");
}

const getLineValues = curry((matcher: RegExp, line: string): string[] => {
  return (line.match(matcher) || []).map((s) => s.trim());
});
