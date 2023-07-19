import express from "express";
import userApis from "./v1/User.js";
import userActivity from "./v1/UserActivity.js";
import reportUser from "./v1/Report.js";

const router = express.Router();

router.use("/user", userApis);
router.use("/useractivity", userActivity);
router.use("/report", reportUser);

export default router;
