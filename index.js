import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import { createConnection } from "./model/dbConn.js";
import user from "./route/user.js";
import policy from "./route/policy.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", user);
app.use("/policy", policy);

createConnection();

app.listen(port, () => console.log(`Backend API listening on port ${port}!`));
