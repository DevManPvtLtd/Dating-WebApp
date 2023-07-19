import express from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWTSEC = "7393$##fwfwk31323"; // add in .env

export const register = async (req, res) => {
  try {
    const duplicateEmail = await User.findOne({ email: req.body.email });
    if (duplicateEmail) {
      return res
        .status(409)
        .json({ message: "This email is already registered" });
    }

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    const encyptPass = await bcrypt.hash(req.body.password, salt);

    //  create user
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      profilePic: req.body?.profilePic,
      gender: req.body.gender,
      age: req.body.age,
      password: encyptPass,
      createdAt: new Date(),
    });

    //  Access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWTSEC
    );

    const { email, password, ...other } = user._doc;
    return res.status(200).json({ user: other, accessToken: accessToken });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ message: err });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //  Access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWTSEC
    );

    const { email, password, ...other } = user._doc;
    return res.status(200).json({ user: other, accessToken: accessToken });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

//  Update user's profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const filter = { _id: user._id };
    const updatedata = {
      bio: req.body?.bio,
      interestIn: req.body?.interestIn,
      location: req.body?.location,
      relationshipType: req.body?.relationshipType,
    };
    const updatedUser = await User.findOneAndUpdate(filter, updatedata, {
      new: true,
    });
    if (req.body?.hobbies.length > 0) {
      const newArr = req.body.hobbies;
      // newArr =
      newArr.forEach((item) => updatedUser.hobbies.push(item));
    }

    if (req.body?.photos.length > 0 && updatedUser.photos.length < 3) {
      const newArr = req.body.photos;
      newArr.forEach((item) => updatedUser.photos.push(item));
    }

    await updatedUser.save();

    return res
      .status(200)
      .json({ message: "Profile update successfully!!", user: updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

// My Profile
export const myprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//  Get all users for admin
export const getalluserAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res
        .status(402)
        .json({ message: "You are not authenticated to see this" });
    }

    const alluser = await User.find({
      _id: { $ne: user._id },
    });
    return res.status(200).json({ users: alluser });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

//  Get all users for users
export const getalluser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let result;

    result = await User.find({ interestIn: user.interestIn });

    return res.status(200).json({ users: alluser });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

//  delete user -- ADMIN
export const deleteuser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin) {
      return res
        .status(402)
        .json({ message: "You are not authenticated to see this" });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Remove the user successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};
