import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../pages/theme";
import { useRouter } from "next/router";

const Item = ({ title }) => {
  const theme = useTheme();
  let mode = "dark";
  const colors = tokens(mode);
  return (
    <MenuItem
      style={{
        color: colors.grey[100],
      }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const router = useRouter();
  let mode = "dark";
  const colors = tokens(mode);
  const Logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Box>
      <Sidebar backgroundColor="transparent">
        <Menu iconShape="square">
          <MenuItem
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3" color={colors.grey[100]}>
                Web-Dashboard
              </Typography>
            </Box>
          </MenuItem>

          <Box mb="25px">
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Hi ,Admin
              </Typography>
            </Box>
          </Box>

          <Box paddingLeft={"10%"}>
            <Item title="Dashboard" />
            <MenuItem
              onClick={() => {
                Logout();
              }}
            >
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
