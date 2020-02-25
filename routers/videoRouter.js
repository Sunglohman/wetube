import express from "express";
import routes from "../routes";
import {
  VIDEOS,
  VIDEOSDETAIL,
  DELETEVIDEO,
  getUPLOAD,
  postUPLOAD,
  getEDITVIDEO,
  postEDITVIDEO
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUPLOAD);
videoRouter.post(routes.upload, uploadVideo, postUPLOAD);

videoRouter.get(routes.editVideo(), onlyPrivate, getEDITVIDEO);
videoRouter.post(routes.editVideo(), postEDITVIDEO);

videoRouter.get(routes.videoDetail(), VIDEOSDETAIL);
videoRouter.get(routes.deleteVideo(), onlyPrivate, DELETEVIDEO);

export default videoRouter;
