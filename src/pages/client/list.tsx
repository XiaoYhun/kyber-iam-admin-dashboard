import React from "react";
import { useDataGrid, EditButton, ShowButton, DeleteButton, List, UrlField, TagField, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useMany } from "@refinedev/core";

export const ClientList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const { data: clientData, isLoading: clientIsLoading } = useMany({
    resource: "clients",
    ids: dataGridProps?.rows?.map((item: any) => item?.client_id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "client_id",
        flex: 1,
        sortable: false,
        headerName: "Client",
        minWidth: 300,
        renderCell: ({ value }) => {
          return <>{value}</>;
        },
      },
      {
        field: "client_name",
        flex: 1,
        sortable: false,
        headerName: "Client Name",
        minWidth: 200,
      },

      {
        field: "created_at",
        flex: 1,
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} format="DD/MM/YYYY HH:mm" />;
        },
      },
      {
        field: "updated_at",
        flex: 1,
        headerName: "Updated At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} format="DD/MM/YYYY HH:mm" />;
        },
      },

      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.client_id} />
              <DeleteButton hideText recordItemId={row.client_id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [clientData?.data]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight getRowId={(row) => row.client_id} />
    </List>
  );
};
