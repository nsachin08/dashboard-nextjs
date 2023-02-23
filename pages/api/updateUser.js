import Users from "../../models/Users";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  console.log(req.body.id);
  let field = req.body.field;

  if (req.method == "POST") {
    let p = await Users.findByIdAndUpdate(req.body.id, {
      [field]: req.body.value,
    });
    console.log(p);
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed " });
  }
};

export default connectDb(handler);
