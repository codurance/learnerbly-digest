import { useState } from "react";

import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { FileInput } from "../../components/FileInput/FileInput";
import { Header } from "../../components/Header/Header";
import { Report } from "../../components/Report/Report";
import { Main, H1 } from "./styles";

function App() {
  const [records, setRecords] = useState<LearnerblyRecord[]>([]);
  const onCSVLoad = (rows: LearnerblyRecord[]): void => {
    setRecords(rows);
  };

  return (
    <div className="App">
      <Header />
      <Main>
        <H1>Learnerbly Digest</H1>
        {records.length === 0 && <FileInput onLoad={onCSVLoad} />}
        {records.length > 0 && <Report data={records} />}
      </Main>
    </div>
  );
}

export default App;
