import express from "express";
import joi from "joi";
import { getErrorMessage } from "../../utils/joi.util.js";
import verifytoken from "../../middlewares/verifyToken.js";
import { report, viewReports, deleteReport } from "../../controller/Report.js";

const router = express.Router();

const reportSchema = joi.object().keys({
  reportedUserId: joi.string().required(),
  reason: joi.string().required(),
});
router.post(
  "/add",
  verifytoken,
  async (req, res, next) => {
    try {
      req.body = await reportSchema.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  report
);

// view all reports
router.get("viewall", verifytoken, viewReports);

// delete report
const deletereportSchema = joi.object().keys({
  id: joi.string().required(),
});
router.delete(
  "/delete/:id",
  verifytoken,
  async (req, res, next) => {
    try {
      req.params = await deletereportSchema.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  deleteReport
);

export default router;
