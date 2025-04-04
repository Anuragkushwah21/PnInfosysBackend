const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },
    mobile: {
      type: String,
      Required: true,
    },
    address: {
      type: String,
      Required: true,
    },
    gender: {
      type: String,
      Required: true,
    },
    college: {
      type: String,
      Required: true,
    },
    qualification: {
      type: String,
      Required: true,
    },
    branch: {
      type: String,
      Required: true,
    },
    semester: {
      type: String,
      Required: true,
    },
    courseName: {
      type: String,
      Required: true,
    },
  },
  { timestamps: true }
);
const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
