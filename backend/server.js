import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import connectDB from "./src/config/DB.js";
import apiRouter from "./src/routes/index.js";
import ApiError from "./src/utils/index.js";

dotenv.config();
const app = express();

// set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

connectDB();
app.use("/api", apiRouter);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.listen(5000, () => {
  console.log(`Server is running on port- ${5000}`.bgWhite.red);
});
