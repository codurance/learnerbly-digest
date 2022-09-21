// TODO: This component is flaged as "lab" in material ui.
// Once it reaches the "production" state this component
// could be removed in favor of the material ui version

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
