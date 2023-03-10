import Website from "../../models/Websites";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let userId = req.body.userId;
  let websites = await Website.find({ userId: userId });
  res.status(200).json({ websites });
};

export default connectDb(handler);
