import "dotenv/config";
import mongoose from "mongoose";
export let database;

const mongoURL = process.env.MONGO_URL;

export const createConnection = () => {
  if (database) {
    return;
  }
  mongoose.connect(mongoURL);
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("ALERT => Error connecting to database");
  });
};
