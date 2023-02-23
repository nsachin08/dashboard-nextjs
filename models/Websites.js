const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    Website: { type: String, required: true, unique: true },
    Ad_revenue: { type: Number, required: true },
    Ad_impressions: { type: Number, required: true },
    Avg_site_view_time: { type: Number, required: true },
    Total_clicks: { type: Number, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Website", WebsiteSchema);
