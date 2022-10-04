import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { DataTable } from "../DataTable/DataTable";
import {
  ReportContainer,
  ReportHeader,
  ReportContent,
  BackButton,
} from "./styles";
import { SyntheticEvent, useState } from "react";
import { TabPanel } from "../TabPanel/TabPanel";
import { ReportStats } from "../ReportStats/ReportStats";

export type ReportProps = {
  data: LearnerblyRecord[];
  onGoBack: () => void;
};

export const Report = (props: ReportProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (_event: SyntheticEvent, newValue: number) =>
    setActiveTab(newValue);

  return (
    <ReportContainer>
      <ReportHeader>
        <Tabs value={activeTab} onChange={changeTab}>
          <Tab label="Data" {...a11yProps(0)} />
          <Tab label="Stats" {...a11yProps(1)} />
        </Tabs>
        <BackButton onClick={props.onGoBack}>BACK</BackButton>
      </ReportHeader>
      <ReportContent>
        <TabPanel value={activeTab} index={0}>
          <DataTable data={props.data} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ReportStats data={props.data} />
        </TabPanel>
      </ReportContent>
    </ReportContainer>
  );
};

function a11yProps(index: number) {
  const id = `simple-tabpanel-${index}`;
  return {
    id,
    "aria-controls": id,
  };
}
