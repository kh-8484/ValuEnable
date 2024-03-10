import { logIn, register } from "../controller/user.js";
import { generateAccessToken } from "../helper/get-jwt.js";
import STATUS from "../utils/status-codes.js";
import express from "express";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "All parameters are required",
      };
      throw err;
    }

    const result = await logIn(email, password);

    if (!result.success) {
      throw result.error;
    }

    const token = generateAccessToken(result.data._id);

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "User Logged In successfully",
      token,
      data: result.data,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json({ message: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, mobile, password, email } = req.body;

    if (!name || !mobile || !password || !email) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "All parameters are required",
      };
      throw err;
    }

    const result = await register(name, mobile, password, email);

    if (!result.success) {
      throw result.error;
    }

    const token = generateAccessToken(result.data._id);

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "User Register successfully",
      token,
      data: result.data,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json(error);
  }
});

export default router;
