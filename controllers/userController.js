import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJOIN = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJOIN = async (req, res, next) => {
  // es6  문법
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // TO do : register User
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      // To do : log User in
      res.redirect(routes.home);
    }
  }
};

export const getLOGIN = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLOGIN = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(profile);
  const {
    _json: { login, id, avatar_url: avatarUrl, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      avatarUrl,
      githubId: id
    });
    console.log(`newUser--- ${newUser}`);
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const LOGOUT = (req, res) => {
  req.logout();

  res.redirect(routes.home);
};

/* user */

export const ME = (req, res) => {
  res.render("userDetail", { pageTitle: "ME", user: req.user });
};
export const USERDETAIL = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });
export const EDITPROFILE = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const CHANGEPASSWORD = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
