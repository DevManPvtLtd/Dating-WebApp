import User from "../model/User.js";
import Report from "../model/Report.js";

//  Add report
export const report = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // const otheruser = await User.findById(req.body.id);
    // if (!otheruser) {
    //   return res.status(400).json({ message: "User not found" });
    // }

    const newReport = await Report.create({
      userId: user._id,
      reportedUserId: req.body.reportedUserId,
      reason: req.body.reason,
    });

    return res.status(200).json({ report: newReport });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

//  View all reports
export const viewReports = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res
        .status(402)
        .json({ message: "You are not authenticated to see this" });
    }

    const allReports = await Report.find();

    return res.status(200).json({ allreports: allReports });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

//  Delete report
export const deleteReport = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res
        .status(402)
        .json({ message: "You are not authenticated to see this" });
    }

    await Report.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Delete the report successfully" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
