import routes from "../routes";
// 모델은 데이터베이스 자체가 아니다. 엘리먼트를 정의하고 받는 통로일뿐이다.
import video from "../models/video";
// view 엔진 설정으로 자동으로 템플릿을 찾는다.

// async 다음 작업으로 넘어가지 않고 작업완료까지 대기시키는 키워드
export const HOME = async (req, res) => {
  try {
    //  -1 내림차순
    const videos = await video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
    console.log(videos);
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const SEARCH = async (req, res) => {
  //  ES6 전 문법const searchingBy = req.query.term;
  // ES6 문법  {term: searchingBy} <- 들어온 쿼리 의 키값을 변경할수  있다.
  const {
    query: { term: searchingBy }
  } = req;
  // let 은 변수다.
  let videos = [];
  try {
    //  $regex <- 레귤러 익스프레션 이다.  $options   i: insencitive 대소문자 구별안하기
    videos = await video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
    console.log(videos);
  } catch (error) {
    console.log(error);
  }
  //                                     searchingBy : searchingBy 이런식이 아니여도 자동으로 인식한다 es6 에서
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

/* video */

export const VIDEOS = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUPLOAD = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUPLOAD = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  //  To do : upload and save video
  res.redirect(routes.videoDetail(newVideo.id));
};

export const VIDEOSDETAIL = async (req, res) => {
  // :id 처럼 파라미터로 들어오는 url에서 뽑아낼때
  const {
    params: { id }
  } = req;

  try {
    const Video = await video.findById(id);
    console.log(Video);
    res.render("videoDetail", { pageTitle: Video.title, Video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEDITVIDEO = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const Video = await video.findById(id);
    console.log(Video);
    res.render("editVideo", { pageTitle: "EditVideo", Video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postEDITVIDEO = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;

  try {
    await video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const DELETEVIDEO = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await video.findOneAndDelete({ _id: id });
  } catch (error) {
    console.error(error);
  }
  res.redirect(routes.home);
};
