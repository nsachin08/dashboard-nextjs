import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar_user from "../components/SideBar_user.js";
import Website from "../models/Websites";
import mongoose from "mongoose";

import { Box } from "@mui/material";
import Web from "./Web";
import { useRouter } from "next/router";
import { useEffect } from "react";

const changeEdit = async (cellData) => {
  const response = await fetch("/api/updateWeb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cellData),
  });
  console.log(response);
};

const User_Dash = ({ webs }) => {
  const router = useRouter();
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("role") == "admin"
    ) {
      router.push("/login");
    }
  });
  const [theme, colorMode] = useMode();
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
            <SideBar_user isSidebar={"true"} />
            <Web webs={webs} />
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
  const Id = context.req.headers.cookie.substring(9);
  console.log(Id);
  let id = 4;
  let webs = await Website.find({ userId: Id });
  webs = JSON.parse(JSON.stringify(webs));

  return {
    props: { webs },
  };
}

export default User_Dash;
