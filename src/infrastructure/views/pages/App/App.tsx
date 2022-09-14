import { useState } from "react";
import { FileInput } from "../../components/FileInput/FileInput";
import { Header } from "../../components/Header/Header";
import { Main, H1 } from "./styles";

function App() {
  const [csv, setCSV] = useState("");
  const onCSVLoad = (csv: any): void => {
    setCSV(csv);
  };

  return (
    <div className="App">
      <Header />
      <Main>
        <H1>Learnerbly Digest</H1>
        <FileInput onLoad={onCSVLoad} />
        <span>{csv}</span>
      </Main>
    </div>
  );
}

export default App;
