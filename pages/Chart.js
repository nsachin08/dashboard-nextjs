import StatBox from "../components/StatBox";
import { Box, Typography } from "@mui/material";
// import Piechart from "../components/Piechart";

import dynamic from "next/dynamic";
const Piechart = dynamic(() => import("../components/Piechart"), {
  ssr: false,
});

const Barchart = dynamic(() => import("../components/Barchart"), {
  ssr: false,
});

const Barchart_v = dynamic(() => import("../components/Barchart_v"), {
  ssr: false,
});

function Chart({
  Ad_impressions,
  Ad_revenue,
  Total_clicks,
  Avg_site,
  t_rev,
  t_impr,
  t_site,
  t_click,
}) {
  console.log(Avg_site);

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        <StatBox title="Total Ad Revenue" value={t_rev} />
        <StatBox title="Total Ad Impression" value={t_impr} />
        <Box
          gridColumn="span 8"
          gridRow="span 5"
          backgroundColor="#101624"
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6">Average Site Viewing Time</Typography>
          <Barchart data={Avg_site} lay="horizontal" />
        </Box>
        <StatBox title="Total Avg Site View Time " value={t_site} />
        <StatBox title="Total Avg Click" value={t_click} />
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor="#101624"
          p="1rem"
          borderRadius="0.55rem"
        >
          Total Ad-revunue
          <Piechart data={Ad_revenue} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 5"
          backgroundColor="#101624"
          p="1rem"
          borderRadius="0.55rem"
        >
          Total Ad-impression
          <Barchart_v data={Ad_impressions} />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 5"
          backgroundColor="#101624"
          p="1rem"
          borderRadius="0.55rem"
        >
          Total Clicks
          <Piechart data={Total_clicks} />
        </Box>
      </Box>
    </Box>
  );
}

export default Chart;
