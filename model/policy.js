import mongoose from "mongoose";

const policy = new mongoose.Schema({
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  sum_assured: { type: Number, required: true },
  premium: { type: Number, required: true },
  premium_frequency: { type: String, required: true },
  pt: { type: Number, required: true },
  ppt: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

export const Policy = mongoose.model("policy", policy);
