import express from "express";
import passport from "passport";
import routes from "../routes";
import { HOME, SEARCH } from "../controllers/videoController";
import {
  LOGOUT,
  getJOIN,
  postJOIN,
  getLOGIN,
  postLOGIN,
  githubLogin,
  githubLoginCallback,
  postGithubLogin,
  ME
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globarRouter = express.Router();

globarRouter.get(routes.join, onlyPublic, getJOIN);
globarRouter.post(routes.join, onlyPublic, postJOIN);

globarRouter.get(routes.login, onlyPublic, getLOGIN);
globarRouter.post(routes.login, onlyPublic, postLOGIN);

globarRouter.get(routes.home, HOME);
globarRouter.get(routes.search, SEARCH);
globarRouter.get(routes.logout, onlyPrivate, LOGOUT);

globarRouter.get(routes.me, ME);

// AUTH

globarRouter.get(routes.github, githubLogin);
globarRouter.get(
  routes.githubcallback,
  githubLoginCallback,
  passport.authenticate("github", {
    failureRedirect: "/login"
  }),
  postGithubLogin
);

export default globarRouter;
