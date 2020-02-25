// 데이터 베이스의 저장될 데이터 타입 정의
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  //   코멘트와 영상 연결 시키는 두번째 방법
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ]
});

const model = mongoose.model("Video", VideoSchema);
export default model;
