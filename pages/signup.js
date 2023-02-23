import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ColorModeContext, useMode } from "../theme";
import { useEffect } from "react";
import { useRouter } from "next/router";

const theme = createTheme();

export default function SignUp() {
  const [theme, colorMode] = useMode();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/user_dash");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);

    data = {
      firstname: data.get("firstName"),
      secondname: data.get("lastName"),
      userEmail: data.get("email"),
      userPassword: data.get("password"),
      userName: data.get("username"),
    };
    const rootUri =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    let res = await fetch("/api/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.success) {
      router.push("/login");
    }

    //move to signin page;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome to Web-Dashboard
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  p: 1,
                  m: 1,
                  borderRadius: 1,
                }}
              >
                <Link href="/login">
                  <Box>
                    <Typography component="h1" variant="h5" color="textPrimary">
                      Already User ? SignIn
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
