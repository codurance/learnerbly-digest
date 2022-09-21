import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { DataTable } from "../DataTable/DataTable";
import { ReportContainer, ReportHeader, ReportContent } from "./styles";
import { SyntheticEvent, useState } from "react";
import { TabPanel } from "../TabPanel/TabPanel";

export type ReportProps = {
  data: LearnerblyRecord[];
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
      </ReportHeader>
      <ReportContent>
        <TabPanel value={activeTab} index={0}>
          <DataTable data={props.data} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <h2>Learnerbly Stats</h2>
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
