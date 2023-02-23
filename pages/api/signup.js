import NewUser from "../../models/NewUser";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    const { firstname, secondname, userEmail, userPassword, userName } =
      req.body;
    let u = new NewUser({
      firstname,
      secondname,
      userEmail,
      userPassword: CryptoJS.AES.encrypt(
        req.body.userPassword,
        "secret123"
      ).toString(),
      userName,
    });

    u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed " });
  }
};

export default connectDb(handler);
