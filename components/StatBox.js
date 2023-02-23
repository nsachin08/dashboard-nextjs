import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="2.25rem 3rem"
      flex="1 1 100%"
      backgroundColor="#101624"
      borderRadius="0.55rem"
      width="20vw"
    >
      <FlexBetween>
        <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        ${value}.00
      </Typography>
    </Box>
  );
};

export default StatBox;
