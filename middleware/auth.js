import jwt from "jsonwebtoken";
import STATUS from "../utils/status-codes.js";

const secret = process.env.JWT_SECRET;

export default (req, res, next) => {
  const token = req.header("token");

  if (!token)
    return res
      .status(STATUS.UNAUTHORIZED)
      .send("Access Denied. No token provided.");

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (err) {
    next({
      statusCode: STATUS.UNAUTHORIZED,
      customMessage: "Invalid token",
    });
  }
};
