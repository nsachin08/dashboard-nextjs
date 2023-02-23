import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { BasicTooltip } from "@nivo/tooltip";

const lineGraphSettings = {
  theme: {
    fontSize: "10x",
    textColor: "#ddd",
  },
};

const TP = (props) => {
  let web = props.data.day;
  return (
    <div
      style={{
        background: "white",
        padding: "9px 12px",
        border: "1px solid #ccc",
        color: "black",
      }}
    >
      <div>{web}</div>
    </div>
  );
};

const Barchart = ({ data, lay }) => (
  <ResponsiveBar
    data={data}
    keys={["degress"]}
    indexBy={"day"}
    layout={lay}
    margin={{ top: 50, right: 130, bottom: 50, left: 160 }}
    padding={0.4}
    valueScale={{ type: "linear" }}
    colors="#3182CE"
    tooltip={TP}
    animate={true}
    theme={lineGraphSettings.theme}
    axisTop={null}
    axisRight={null}
  />
);

export default Barchart;
