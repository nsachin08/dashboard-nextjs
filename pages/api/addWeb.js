import Website from "../../models/Websites";
import Users from "../../models/Users";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let p = new Website({
      userId: req.body.userId,
      Website: req.body.Website,
      Ad_revenue: req.body.Ad_revenue,
      Ad_impressions: req.body.Ad_impressions,
      Avg_site_view_time: req.body.Avg_site_view_time,
      Total_clicks: req.body.Total_clicks,
    });
    let u = new Users({
      userId: req.body.userId,
      userName: req.body.username,
      userCompany: req.body.Website,
      userStatus: "Active",
      userEmail: req.body.email,
      userPassword: req.body.password,
    });
    await u.save();
    await p.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
