import "./db";
import "./models/video";
import "./models/comment";
import "./models/User";
import dotenv from "dotenv";
// export default 로 했을때 ..
import app from "./app";
dotenv.config();

//  env port 를 못찾으면 4000 번으로 ....
const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`LIstening on: http://localhost:${PORT}`);

//   내가 작성한 app.js 스크립트 파일을 사용할수 있다.
app.listen(PORT, handleListening);
