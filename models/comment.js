import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  //   코멘트와 영상의 연결 시키기 첫번째 방법
  //   video: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "video"
  //   }
});

const model = mongoose.model("comment", CommentSchema);
export default model;
