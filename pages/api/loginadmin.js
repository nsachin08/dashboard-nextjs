import NewUser from "../../models/NewUser";
import connectDb from "../../middleware/mongoose";
import { serialize } from "cookie";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    let user = await NewUser.findOne({ userEmail: req.body.userEmail });
    console.log(user);

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.userPassword, "secret123");
      let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
      if (
        req.body.userEmail === user.userEmail &&
        req.body.userPassword == decryptedPass
      ) {
        var token = jwt.sign({ user }, "jwtsecret", { expiresIn: "2d" });

        let role = user.role;
        res.status(200).json({ success: true, token, role });
      } else {
        res.status(200).json({ success: false, error: "Invalid credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "User Doesn't exists" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed " });
  }
};

export default connectDb(handler);
