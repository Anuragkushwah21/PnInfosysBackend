const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      Required: true,
    },
    notice: {
      type: String,
      Required: true,
    },
    link: {
      type: String,
      Required: true,
    },
  },
  { timestamps: true }
);
const NoticeModel = mongoose.model("Notice", NoticeSchema);

module.exports = NoticeModel;
