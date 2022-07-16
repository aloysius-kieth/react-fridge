import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridColTypeDef,
  GRID_DATE_COL_DEF,
  GridFilterItem,
  GridCellParams,
  GridFilterInputValueProps,
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import { randomCreatedDate } from "@mui/x-data-grid-generator";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import locale from "date-fns/locale/en-US";

function buildApplyDateFilterFn(
  filterItem: GridFilterItem,
  compareFn: (value1: number, value2: number) => boolean,
  showTime: boolean = false
) {
  if (!filterItem.value) {
    return null;
  }

  const filterValueMs = filterItem.value.getTime();

  return ({ value }: GridCellParams<Date, any, any>): boolean => {
    if (!value) {
      return false;
    }

    // Make a copy of the date to not reset the hours in the original object
    const dateCopy = new Date(value);
    dateCopy.setHours(0, 0, 0, 0);
    const cellValueMs = dateCopy.getTime();

    return compareFn(cellValueMs, filterValueMs);
  };
}

function GridFilterDateInput(props: GridFilterInputValueProps) {
  const { item, applyValue, apiRef } = props;
  const handleFilterChange = (newValue: unknown) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <DatePicker
      value={item.value || null}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={apiRef.current.getLocaleText("filterPanelInputLabel")}
        />
      )}
      InputAdornmentProps={{
        sx: {
          "& .MuiButtonBase-root": {
            marginRight: -1,
          },
        },
      }}
      onChange={handleFilterChange}
    />
  );
}

function getDateFilterOperators(
  showTime: boolean = false
): GridColTypeDef["filterOperators"] {
  return [
    {
      value: "is",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 === value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "not",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 !== value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "after",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 > value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "onOrAfter",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 >= value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "before",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 < value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "onOrBefore",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 <= value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "isEmpty",
      getApplyFilterFn: () => {
        return ({ value }): boolean => {
          return value == null;
        };
      },
      requiresFilterValue: false,
    },
    {
      value: "isNotEmpty",
      getApplyFilterFn: () => {
        return ({ value }): boolean => {
          return value != null;
        };
      },
      requiresFilterValue: false,
    },
  ];
}

const dateAdapter = new AdapterDateFns({ locale });

/**
 * `date` column
 */
const dateColumnType: GridColTypeDef<Date | string, string> = {
  ...GRID_DATE_COL_DEF,
  resizable: false,
  renderEditCell: (params) => {
    return <GridEditDateCell {...params} />;
  },
  filterOperators: getDateFilterOperators(),
  valueFormatter: (params) => {
    if (typeof params.value === "string") {
      return params.value;
    }
    if (params.value) {
      return dateAdapter.format(params.value, "keyboardDate");
    }
    return "";
  },
};

function GridEditDateCell({
  id,
  field,
  value,
}: GridRenderEditCellParams<Date | string | null>) {
  const apiRef = useGridApiContext();

  const handleChange = (newValue: unknown) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <DatePicker
      value={value}
      renderInput={(params) => <TextField {...params} />}
      onChange={handleChange}
    />
  );
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 90, editable: true },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
    editable: true,
  },
  {
    field: "expiryDate",
    ...dateColumnType,
    headerName: "Expiry Date",
    type: "number",
    width: 180,
    editable: true,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

// Pesudo data
//TODO: get data from database
const rows = [
  {
    id: 1,
    name: "Cabbage",
    type: "Vegetable",
    quantity: 2,
    expiryDate: randomCreatedDate(),
  },
  {
    id: 2,
    name: "Cucumber",
    type: "Vegetable",
    quantity: 5,
    expiryDate: randomCreatedDate(),
  },
  {
    id: 3,
    name: "Apple",
    type: "Fruit",
    quantity: 2,
    expiryDate: randomCreatedDate(),
  },
  {
    id: 4,
    name: "Orange",
    type: "Fruit",
    quantity: 6,
    expiryDate: randomCreatedDate(),
  },
  {
    id: 5,
    name: "Avocado",
    type: "Fruit",
    quantity: 8,
    expiryDate: randomCreatedDate(),
  },
  {
    id: 6,
    name: "Kiwi",
    type: "Fruit",
    quantity: 5,
    expiryDate: randomCreatedDate(),
  },
  {
    id: 7,
    name: "Lychee",
    type: "Fruit",
    quantity: 1,
    expiryDate: randomCreatedDate(),
  },
  {
    id: 8,
    name: "Durian",
    type: "Fruit",
    quantity: 3,
    expiryDate: randomCreatedDate(),
  },
];

export default function DataGridDemo() {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          className="bg-light-grayBlue"
          autoHeight
          experimentalFeatures={{ newEditingApi: true }}
        />
      </LocalizationProvider>
    </Box>
  );
}
