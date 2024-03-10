import STATUS from "../utils/status-codes.js";
import {
  createUser,
  fetchUser,
  fetchUserByEmailAndPassword,
} from "../repositories/user.js";

export const register = async (name, mobile, password, email) => {
  try {
    const userExist = await fetchUser(email);

    if (userExist.success) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "User already exists",
      };
      throw err;
    }

    const result = await createUser(name, mobile, password, email);

    if (!result.success) {
      throw result.message;
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const logIn = async (email, password) => {
  try {
    const userExist = await fetchUserByEmailAndPassword(email, password);

    if (!userExist.success) {
      throw userExist.message;
    }

    return {
      success: true,
      data: userExist.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
