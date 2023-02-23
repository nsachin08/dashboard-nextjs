import Website from "../models/Websites";
import Users from "../models/Users";
import mongoose from "mongoose";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const changeEdit = async (cellData) => {
  const response = await fetch("/api/updateWeb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cellData),
  });
};

const Web = ({ webs }) => {
  const columns = [
    {
      field: "Website",
      headerName: "Website",
      flex: 1,
      editable: true,
    },
    {
      field: "Ad_revenue",
      headerName: "Ad revenue",
      flex: 1,
      editable: true,
    },
    {
      field: "Ad_impressions",
      headerName: "Ad impressions",
      flex: 1,
      editable: true,
    },
    {
      field: "Avg_site_view_time",
      headerName: "Avg site view time",
      flex: 1,
    },
    {
      field: "Total_clicks",
      headerName: "Total clicks",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 5rem">
      <Box mt="40px" height="80vh" width="75vw">
        <DataGrid
          getRowId={(row) => row._id}
          onCellEditCommit={changeEdit}
          rows={webs || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Web;
