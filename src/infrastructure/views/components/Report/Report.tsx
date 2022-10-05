import { SyntheticEvent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Switch } from "@mui/material";

import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { DataTable } from "../DataTable/DataTable";
import { TabPanel } from "../TabPanel/TabPanel";
import { ReportStats } from "../ReportStats/ReportStats";
import {
  ReportContainer,
  ReportHeader,
  ReportContent,
  BackButton,
  Expander,
  SwitchContainer,
  SwitchLabel,
} from "./styles";

export type ReportProps = {
  data: LearnerblyRecord[];
  onGoBack: () => void;
};

const FULL_YEAR_BUDGET = 300;

export const Report = (props: ReportProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [fullYearFilter, setFullYearFilter] = useState(false);

  const changeTab = (_event: SyntheticEvent, newValue: number) =>
    setActiveTab(newValue);

  const records = fullYearFilter
    ? props.data.filter((record) => record.budget === FULL_YEAR_BUDGET)
    : props.data;

  return (
    <ReportContainer>
      <ReportHeader>
        <Tabs value={activeTab} onChange={changeTab}>
          <Tab label="Data" {...a11yProps(0)} />
          <Tab label="Stats" {...a11yProps(1)} />
        </Tabs>
        <Expander />
        <SwitchContainer>
          <SwitchLabel>Only Full Years</SwitchLabel>
          <Switch
            checked={fullYearFilter}
            onChange={(e) => setFullYearFilter(e.target.checked)}
          />
        </SwitchContainer>
        <BackButton onClick={props.onGoBack}>BACK</BackButton>
      </ReportHeader>
      <ReportContent>
        <TabPanel value={activeTab} index={0}>
          <DataTable data={records} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ReportStats data={records} />
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
