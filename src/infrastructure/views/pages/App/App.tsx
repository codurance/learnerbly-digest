import { useState } from "react";

import { StoredFile } from "../../../../domain/models/csv";
import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { fileManagerService } from "../../../../domain/services/file-manager";
import { fileReader } from "../../../instances/file-reader";
import { localStorage } from "../../../instances/local-storage";
import { browser } from "../../../repositories/browser";
import { FileManager } from "../../components/FileManager/FileManager";
import { Header } from "../../components/Header/Header";
import { Report } from "../../components/Report/Report";
import { Main, H1, Card } from "./styles";

const service = fileManagerService(browser(fileReader(), localStorage()));

function App() {
  const [records, setRecords] = useState<LearnerblyRecord[] | null>(null);

  const onCSVLoad = (rows: LearnerblyRecord[]): void => {
    setRecords(rows);
  };

  const onFileChange = (file: StoredFile) => {
    const records = service.loadStoredFile(file);
    setRecords(records);
  };

  const showFileManager = () => {
    setRecords(null);
  };

  return (
    <div className="App">
      <Header />
      <Main>
        <H1>Learnerbly Digest</H1>
        <Card>
          {records == null && (
            <FileManager onLoad={onCSVLoad} onFileChange={onFileChange} />
          )}
          {records != null && (
            <Report data={records} onGoBack={showFileManager} />
          )}
        </Card>
      </Main>
    </div>
  );
}

export default App;
