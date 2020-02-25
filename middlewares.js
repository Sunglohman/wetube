import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const uploadVideo = multerVideo.single("videoFile");

// 로그인 사용자접근 불가페이지
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

//  로그인 하지 않은사용자 접근 불가페이지
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const localsMiddleware = (req, res, next) => {
  // locals 추가 하면 그것들의 템플릿,컨트롤러 변수를 어디에서든 사용가능하다.
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};
