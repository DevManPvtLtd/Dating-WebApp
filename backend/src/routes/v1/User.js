import express from "express";
import joi from "joi";
import {
  register,
  login,
  updateProfile,
  myprofile,
  getalluserAdmin,
  getalluser,
  deleteuser,
} from "../../controller/User.js";
import { getErrorMessage } from "../../utils/joi.util.js";
import verifytoken from "../../middlewares/verifyToken.js";

const router = express.Router();

//  SignUp
const signUpMiddleware = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().trim().required(),
  profilePic: joi.string(),
  gender: joi.string().required(),
  age: joi.number().required(),
});
router.post(
  "/signup",
  async (req, res, next) => {
    try {
      req.body = await signUpMiddleware.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  register
);

//  LogIn
const loginMiddleware = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().trim().required(),
});
router.post(
  "/login",
  async (req, res, next) => {
    try {
      req.body = await loginMiddleware.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  login
);

// Update profile
const updateProfileMiddleware = joi.object().keys({
  interestIn: joi.string().required(),
  location: joi.string().required(),
  bio: joi.string(),
  hobbies: joi.array().items(joi.string()),
  photos: joi.array().items(joi.string()),
  relationshipType: joi.string(),
});
router.put(
  "/profileupdate",
  verifytoken,
  async (req, res, next) => {
    try {
      req.body = await updateProfileMiddleware.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  updateProfile
);

// My profile
router.get(
  "/myprofile",
  verifytoken,
  async (req, res, next) => {
    try {
      req.body = await updateProfileMiddleware.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  myprofile
);

// get all users - admin
router.get("/admin/alluser", verifytoken, getalluserAdmin);

// get all users - user
router.get("/alluser", verifytoken, getalluser);

//  delete user  -  ADMIN
const deleteUserSchema = joi.object().keys({
  id: joi.string().trim().required(),
});
router.put(
  "/admin/delete/:id",
  verifytoken,
  async (req, res, next) => {
    try {
      req.params = await deleteUserSchema.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  deleteuser
);

export default router;
