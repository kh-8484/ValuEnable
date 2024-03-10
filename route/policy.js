import express from "express";
import auth from "../middleware/auth.js";
import STATUS from "../utils/status-codes.js";
import { addPolicy, getPolicyById } from "../controller/policy.js";
const router = express.Router();

router.get("/:policyId", auth, async (req, res) => {
  try {
    const { policyId } = req.params;

    if (!policyId) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "Policy Id is required",
      };
      throw err;
    }

    const result = await getPolicyById(policyId);
    if (!result.success) {
      throw result.error;
    }

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "Policy fetched successfully",
      data: result.data,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json({ message: error });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { dob, gender, sum_assured, premium, premium_frequency, pt, ppt } =
      req.body;

    if (
      !dob ||
      !gender ||
      !sum_assured ||
      !premium ||
      !premium_frequency ||
      !pt ||
      !ppt
    ) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "All parameters are required",
      };
      throw err;
    }

    const result = await addPolicy({ ...req.body, userId: _id });

    if (!result.success) {
      throw result.error;
    }

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "Policy created successfully",
      data: result.data,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json(error);
  }
});

export default router;
