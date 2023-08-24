import jwt from "jsonwebtoken";
import "dotenv/config";
const SECRETE_KEY = process.env.SECRETE_KEY;

const Authotorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(token, SECRETE_KEY);
    if (verify) {
      console.log(verify);
      next();
    } else {
      console.log(err);
      return res.status(500).json({ msg: err });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "invalid token" });
  }
};

export default Authotorization;
