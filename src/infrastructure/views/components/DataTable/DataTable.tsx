import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Container } from "./styles";

const columns: GridColDef[] = [
  { field: "id" },
  { field: "email", headerName: "Email", flex: 3 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "surname", headerName: "Surname", flex: 2 },
  { field: "country", headerName: "Country", flex: 2 },
  { field: "timeFrame", headerName: "Time Frame", flex: 2 },
  { field: "currency", headerName: "Currency", flex: 2 },
  { field: "budget", headerName: "Budget", flex: 2 },
  { field: "spent", headerName: "Spent", flex: 2 },
  { field: "budgetUsage", headerName: "Usage (%)", flex: 2 },
];

export type DataTableProps = {
  data: any[];
};

export const DataTable = (props: DataTableProps) => {
  return (
    <Container>
      <DataGrid
        initialState={{ columns: { columnVisibilityModel: { id: false } } }}
        columnBuffer={9}
        columns={columns}
        rows={props.data}
        pageSize={25}
      />
    </Container>
  );
};
