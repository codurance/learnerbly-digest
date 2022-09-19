import { render, screen, waitFor } from "@testing-library/react";
import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";

import { CSV_ROWS } from "../../../../test/mocks";
import { DataTable } from "./DataTable";

const VISIBLE_ATTRIBUTES = ["email", "name", "surname", "country"];

describe("Data Tabel", () => {
  test("should show Learnerbly Records", async () => {
    render(<DataTable data={CSV_ROWS} />);

    await Promise.all(CSV_ROWS.map(checkRecordExists));
  });
});

function checkRecordExists(record: LearnerblyRecord) {
  return Promise.all(
    VISIBLE_ATTRIBUTES.map(checkRecordAttributeExists(record))
  );
}

function checkRecordAttributeExists(record: LearnerblyRecord) {
  return async (attr: string) =>
    await waitFor(async () => {
      expect(await screen.findAllByText(record[attr])).not.toBeNull();
    });
}
