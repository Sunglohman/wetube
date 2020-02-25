import express from "express";
import routes from "../routes";
import {
  USERS,
  USERDETAIL,
  EDITPROFILE,
  CHANGEPASSWORD
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, CHANGEPASSWORD);
userRouter.get(routes.editProfile, onlyPrivate, EDITPROFILE);
userRouter.get(routes.userDetail(), onlyPrivate, USERDETAIL);

export default userRouter;
