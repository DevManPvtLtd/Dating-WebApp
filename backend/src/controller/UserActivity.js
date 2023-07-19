import UserActivity from "../model/UserActivity.js";
import User from "../model/User.js";

//  Like API
export const likeUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otheruser = await User.findById(req.params.id);
    if (!otheruser) {
      return res.status(400).json({ message: "User not found" });
    }

    let useractivity = await UserActivity.findOne({ userId: user._id });

    if (!useractivity) {
      useractivity = await UserActivity.create({ userId: user._id });
    }

    if (
      useractivity?.likedUsers === null ||
      useractivity?.likedUsers.length === 0 ||
      !useractivity?.likedUsers.includes(otheruser._id)
    ) {
      useractivity.likedUsers.push(otheruser._id);
      await useractivity.save();

      //  if we already disliked the user then remove the dislike
      if (
        useractivity?.dislikedUsers.length > 0 &&
        useractivity.dislikedUsers.includes(otheruser._id)
      ) {
        const newDislikeArray = useractivity.dislikedUsers.filter(
          (userid) => JSON.stringify(userid) !== JSON.stringify(otheruser._id)
        );
        useractivity.dislikedUsers = newDislikeArray;
        await useractivity.save();
      }
    }

    return res.status(200).json({ useractivity: useractivity });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

//  Dislike API
export const dislikeUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otheruser = await User.findById(req.params.id);
    if (!otheruser) {
      return res.status(400).json({ message: "User not found" });
    }

    let useractivity = await UserActivity.findOne({ userId: user._id });

    if (!useractivity) {
      useractivity = await UserActivity.create({ userId: user._id });
    }

    if (
      useractivity?.dislikedUsers === null ||
      useractivity?.dislikedUsers.length === 0 ||
      !useractivity?.dislikedUsers.includes(otheruser._id)
    ) {
      useractivity.dislikedUsers.push(otheruser._id);
      await useractivity.save();

      //  if we already disliked the user then remove the dislike
      if (
        useractivity?.likedUsers.length > 0 &&
        useractivity.likedUsers.includes(otheruser._id)
      ) {
        const newDislikeArray = useractivity.likedUsers.filter(
          (userid) => JSON.stringify(userid) !== JSON.stringify(otheruser._id)
        );
        useractivity.likedUsers = newDislikeArray;
        await useractivity.save();
      }
    }

    return res.status(200).json({ useractivity: useractivity });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

// Block Api
//  todo: have to add unblock logic in this same api
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otheruser = await User.findById(req.params.id);
    if (!otheruser) {
      return res.status(400).json({ message: "User not found" });
    }

    let useractivity = await UserActivity.findOne({ userId: user._id });

    if (!useractivity) {
      useractivity = await UserActivity.create({ userId: user._id });
    }

    if (
      useractivity.blockedUsers.length === 0 ||
      !useractivity.blockedUsers.includes(otheruser._id)
    ) {
      useractivity.blockedUsers.push(otheruser._id);
      await useractivity.save();
    }

    return res.status(200).json({ useractivity: useractivity });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

//  View others profile
export const viewprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otheruser = await User.findById(req.params.id);
    if (!otheruser) {
      return res.status(400).json({ message: "User not found" });
    }

    let useractivity = await UserActivity.findOne({ userId: otheruser._id });

    if (!useractivity) {
      useractivity = await UserActivity.create({ userId: otheruser._id });
    }

    if (
      useractivity.profileVisitor.length === 0 ||
      !useractivity.profileVisitor.includes(user._id)
    ) {
      useractivity.profileVisitor.unshift(user._id);
      await useractivity.save();
    } else {
      const newProfileVisitorsArray = useractivity.profileVisitor.filter(
        (userid) => JSON.stringify(userid) !== JSON.stringify(user._id)
      );
      newProfileVisitorsArray.unshift(user._id);
      useractivity.likedUsers = newProfileVisitorsArray;
      await useractivity.save();
    }

    return res.status(200).json({ useractivity: useractivity });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
