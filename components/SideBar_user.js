import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

const Item = React.forwardRef(({ title, link }, ref) => {
  const theme = useTheme();
  let mode = "dark";
  const colors = tokens(mode);
  return (
    <MenuItem
      style={{
        color: colors.grey[100],
      }}
    >
      <Link href={link} passHref legacyBehavior ref={ref}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
});

const SideBar_user = () => {
  const theme = useTheme();
  let mode = "dark";
  const colors = tokens(mode);
  const [user, setuser] = useState("null");
  const router = useRouter();

  useEffect(() => {
    setuser(localStorage.getItem("name"));
  }, []);

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
                Hi ,{user}
              </Typography>
            </Box>
          </Box>

          <Box paddingLeft={"10%"}>
            <Item title="Home" link="user_dash"></Item>
            <Item title="Analytical" link="user_chart"></Item>
            <Item title="Add Website" link="user_web"></Item>
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

export default SideBar_user;
