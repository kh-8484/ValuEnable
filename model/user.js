import mongoose from "mongoose";
import bcrypt from "bcrypt";

const user = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, required: false },
  modified_at: { type: Date, required: false },
});

user.pre("save", async function (next) {
  const user = this;

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const hashedMobile = await bcrypt.hash(`${user.mobile}`, 10);
    user.mobile = hashedMobile;

    return next();
  } catch (error) {
    return next(error);
  }
});

export const User = mongoose.model("user", user);
