import Website from "../../models/Websites";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let field = req.body.field;

  if (req.method == "POST") {
    let p = await Website.findByIdAndUpdate(req.body.id, {
      [field]: req.body.value,
    });
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
