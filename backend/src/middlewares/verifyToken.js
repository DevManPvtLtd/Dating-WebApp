import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const JWTSEC = "7393$##fwfwk31323"; // add in .env

dotenv.config();

const verifytoken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, JWTSEC, (err, user) => {
      if (err) return res.status(400).json("Some error occured");
      req.user = user;
      next();
    });
  } else {
    return res.status(400).json("Access token is not valid");
  }
};

export default verifytoken;
