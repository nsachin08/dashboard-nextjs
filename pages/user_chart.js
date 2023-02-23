import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar_user from "../components/SideBar_user.js";
import React, { useEffect } from "react";

import Website from "../models/Websites";
import mongoose from "mongoose";
import { useRouter } from "next/router";

import { Box, useTheme } from "@mui/material";
import Chart from "./Chart";

const User_Chart = ({
  webs,
  Ad_revenue,
  Ad_impressions,
  Avg_site,
  Total_clicks,
  t_rev,
  t_impr,
  t_site,
  t_click,
}) => {
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
            <Chart
              Ad_impressions={Ad_impressions}
              Ad_revenue={Ad_revenue}
              Avg_site={Avg_site}
              Total_clicks={Total_clicks}
              t_rev={t_rev}
              t_impr={t_impr}
              t_site={t_site}
              t_click={t_click}
            />
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
  let Id = "0";
  if (context.req.headers.cookie == undefined) {
  } else {
    Id = context.req.headers.cookie.substring(9);
  }

  let webs = await Website.find({ userId: Id });
  webs = JSON.parse(JSON.stringify(webs));
  let t_rev = 0;
  let t_impr = 0;
  let t_site = 0;
  let t_click = 0;

  let Ad_revenue = [];
  let Ad_impressions = [];
  let Avg_site = [];
  let Total_clicks = [];
  for (let i = 0; i < webs.length; i++) {
    t_rev += webs[i]["Ad_revenue"];
    t_impr += webs[i]["Ad_impressions"];
    t_site += webs[i]["Avg_site_view_time"];
    t_click += webs[i]["Total_clicks"];
    Ad_revenue.push({
      id: webs[i]["Website"],
      label: webs[i]["Website"],
      value: webs[i]["Ad_revenue"],
    });
    Ad_impressions.push({
      day: webs[i]["Website"],
      degress: webs[i]["Ad_impressions"],
    });
    Avg_site.push({
      day: webs[i]["Website"],
      degress: webs[i]["Avg_site_view_time"],
    });
    Total_clicks.push({
      id: webs[i]["Website"],
      label: webs[i]["Website"],
      value: webs[i]["Total_clicks"],
    });
  }

  return {
    props: {
      webs,
      Ad_revenue,
      Ad_impressions,
      Avg_site,
      Total_clicks,
      t_rev,
      t_impr,
      t_site,
      t_click,
    },
  };
}

export default User_Chart;
