import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ColorModeContext, useMode } from "../theme";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") == "admin"
    ) {
      router.push("/admin/dashboard");
    }
  });

  const [theme, colorMode] = useMode();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    console.log({
      userEmail: data.get("email"),
      userPassword: data.get("password"),
    });
    data = {
      userEmail: data.get("email"),
      userPassword: data.get("password"),
    };

    let res = await fetch("http://localhost:3000/api/loginadmin", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    if (response.success) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      router.push("/admin/dashboard");
    } else {
      toast.error(response.error, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer
        className="toast-position"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Portal
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
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
                  <Link href="/forgot">
                    <Box>
                      <Typography
                        component="h1"
                        variant="h5"
                        color="textPrimary"
                      >
                        Forgot Password ?
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
