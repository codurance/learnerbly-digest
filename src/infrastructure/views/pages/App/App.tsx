import { useState } from "react";

import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { DataTable } from "../../components/DataTable/DataTable";
import { FileInput } from "../../components/FileInput/FileInput";
import { Header } from "../../components/Header/Header";
import { Main, H1, ReportContainer } from "./styles";

function App() {
  const [rows, setRows] = useState<LearnerblyRecord[]>([]);
  const onCSVLoad = (rows: LearnerblyRecord[]): void => {
    setRows(rows);
  };

  return (
    <div className="App">
      <Header />
      <Main>
        <H1>Learnerbly Digest</H1>
        {rows.length === 0 && <FileInput onLoad={onCSVLoad} />}
        {rows.length > 0 && (
          <ReportContainer>
            <DataTable data={rows} />
          </ReportContainer>
        )}
      </Main>
    </div>
  );
}

export default App;
