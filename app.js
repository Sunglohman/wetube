// require 는 import 처럼 라이브러리 사용할때 ..
// 기존 자바스크립트 문법
// const express = require("express");
// ES6  문법
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieparser from "cookie-parser";
import bodyparser from "body-parser";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
// export 를 기본으로 했을때 import 문
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import "./passport";

const app = express();

const CookieStore = MongoStore(session);
app.use(helmet());
// view engine 설정 pug
app.set("view engine", "pug");
//
app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());
// local 변수를 global 변수로 만들어준다.
app.use(localsMiddleware);
// express.static : directory 에서 file을 보내주는 middleware
app.use("/uploads", express.static("uploads"));
//  webpack 설정
app.use("/static", express.static("static"));
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
