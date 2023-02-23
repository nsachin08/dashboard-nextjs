import Users from "../../models/Users";
import mongoose from "mongoose";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";

const changeEdit = async (cellData) => {
  const response = await fetch("/api/updateUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cellData),
  });
  console.log(response);
};

const Admin = ({ users }) => {
  const router = useRouter();
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("role") == "user"
    ) {
      router.push("/admin/login");
    }
  });

  const [theme, colorMode] = useMode();

  const columns = [
    {
      field: "userId",
      headerName: "Userid",
      flex: 0.5,
      editable: true,
    },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      editable: true,
    },
    {
      field: "userCompany",
      headerName: "Usercompany",
      flex: 1,
      editable: true,
    },
    {
      field: "userStatus",
      headerName: "Userstatus",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
    },
    {
      field: "userEmail",
      headerName: "Useremail",
      flex: 1,
    },
  ];

  return (
    <ProSidebarProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <SideBar isSidebar={"true"} />
            <Box m="1.5rem 5rem">
              <Box mt="40px" height="80vh" width="75vw">
                <DataGrid
                  getRowId={(row) => row._id}
                  onCellEditCommit={changeEdit}
                  rows={users || []}
                  columns={columns}
                />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ProSidebarProvider>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let users = await Users.find();
  users = JSON.parse(JSON.stringify(users));

  return {
    props: { users },
  };
}

export default Admin;
