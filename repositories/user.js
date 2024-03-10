import { User } from "../model/user.js";
import bcrypt from "bcrypt";

export const createUser = async (name, mobile, password, email) => {
  try {
    const user = await User.create({
      name,
      mobile,
      email,
      password,
      created_at: Date(),
    });

    if (!user) {
      let err = {
        message: "User not created",
      };
      throw err;
    }

    return {
      success: true,
      message: "User created successfully",
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchUser = async (email) => {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      let err = {
        message: "User not found",
      };
      throw err;
    }

    return {
      success: true,
      message: "User found successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchUserById = async (_id) => {
  try {
    const user = await User.findOne({ _id }).exec();

    if (!user) {
      let err = {
        message: "User not found",
      };
      throw err;
    }

    return {
      success: true,
      message: "User found successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchUserByEmailAndPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email }).exec();
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      let err = {
        message: "User not found",
      };
      throw err;
    }

    return {
      success: true,
      message: "User found successfully",
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
