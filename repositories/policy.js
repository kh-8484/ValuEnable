import { Policy } from "../model/policy.js";

export const createPolicy = async ({
  dob,
  gender,
  sum_assured,
  premium,
  premium_frequency,
  pt,
  ppt,
  userId,
}) => {
  try {
    const policy = await Policy.create({
      dob,
      gender,
      sum_assured,
      premium,
      premium_frequency,
      pt,
      ppt,
      userId,
    });

    if (!policy) {
      let err = {
        message: "Policy not created",
      };
      throw err;
    }

    return {
      success: true,
      message: "Policy created successfully",
      data: policy,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchPolicyById = async (_id) => {
  try {
    const policy = await Policy.findOne({ _id }).exec();

    if (!policy) {
      let err = {
        message: "Policy not found",
      };
      throw err;
    }

    return {
      success: true,
      message: "Policy found successfully",
      data: policy,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
