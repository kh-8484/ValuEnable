import axiosInstance from "../utils/axios.js";

interface Policy {
  dob: string;
  gender: string;
  sumAssured: number;
  modalPremium: number;
  premiumFrequency: string;
  pt: number;
  ppt: number;
}
export const createPolicy = async ({
  dob,
  gender,
  sumAssured,
  modalPremium,
  premiumFrequency,
  pt,
  ppt,
}: Policy) => {
  try {
    const result = await axiosInstance.post(`policy`, {
      dob,
      gender,
      sum_assured: sumAssured,
      premium: modalPremium,
      premium_frequency: premiumFrequency,
      pt,
      ppt,
    });

    const { status, data, message } = result.data;

    if (status != 200) throw new Error(message);

    return { success: true, data };
  } catch (error) {
    console.log("error: ", error);
    return { success: false };
  }
};

export const getPolicyById = async (policyId: string) => {
  try {
    const result = await axiosInstance.get(`policy/${policyId}`, {});

    const { status, data, message } = result.data;

    if (status != 200) throw new Error(message);

    return { success: true, data };
  } catch (error) {
    console.log("error: ", error);
    return { success: false };
  }
};
