import { fetchPolicyById, createPolicy } from "../repositories/policy.js";
import { calculatePolicy } from "../utils/helper.js";

export const addPolicy = async ({
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
    const result = await createPolicy({
      dob,
      gender,
      sum_assured,
      premium,
      premium_frequency,
      pt,
      ppt,
      userId,
    });

    if (!result.success) {
      throw result.error;
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getPolicyById = async (policyId) => {
  try {
    const result = await fetchPolicyById(policyId);

    if (!result.success) {
      throw result.message;
    }

    const data = calculatePolicy(result.data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
