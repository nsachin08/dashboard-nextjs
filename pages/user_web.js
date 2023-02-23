import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar_user from "../components/SideBar_user.js";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";

import { Box } from "@mui/material";

export default function User_web() {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    const id = localStorage.getItem("id");
    const username = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    data = {
      userId: id,
      Ad_revenue: Number(data.get("adrevenue")),
      Website: String(data.get("webname")),
      Ad_impressions: Number(data.get("adimpr")),
      Avg_site_view_time: Number(data.get("avgtime")),
      Total_clicks: Number(data.get("totalclicks")),
      username: String(username),
      email: String(email),
      password: String(password),
    };
    const rootUri =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    let res = await fetch("/api/addWeb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    if (response.success) {
      router.push("/user_chart");
    }
  };

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
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <WysiwygIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Website
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ m: 5 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="webname"
                      label="Website Name"
                      name="webname"
                      autoComplete="webname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      fullWidth
                      id="adrevenue"
                      label="Ad Revenue"
                      name="adrevenue"
                      autoComplete="adrevenue"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      fullWidth
                      id="adimpr"
                      label="Ad Impressions"
                      name="adimpr"
                      autoComplete="adimpr"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      fullWidth
                      name="avgtime"
                      label="Avg Time"
                      id="avgtime"
                      autoComplete="avgtime"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      fullWidth
                      name="totalclicks"
                      label="Total Clicks"
                      id="totalclicks"
                      autoComplete="totalclicks"
                      type="number"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Website
                </Button>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ProSidebarProvider>
  );
}
