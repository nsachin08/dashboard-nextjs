import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const Piechart = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 90, bottom: 50, left: 90 }}
    innerRadius={0.45}
    padAngle={0.9}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    isInteractive={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#FFF"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 4]] }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
  />
);

export default Piechart;
