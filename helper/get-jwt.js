import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const generateAccessToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    secret
  );
};
