const StudentModel = require("../model/StudentModel");
class StudentController {
  static InsertStudent = async (req, res) => {
    try {
      const {
        name,
        email,
        mobile,
        address,
        gender,
        college,
        qualification,
        branch,
        semester,
        courseName,
      } = req.body;
      const data = new StudentModel({
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        gender: gender,
        college: college,
        qualification: qualification,
        branch: branch,
        semester: semester,
        courseName: courseName,
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "Your Registration Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllStudent = async (req, res) => {
    try {
      // Get all Student
      const allStudent = await StudentModel.find();
      // Count the number of student
      const StudentCount = await StudentModel.countDocuments();
      res.status(201).json({
        status: true,
        allStudent,
        StudentCount, // Return the count of student
      });
    } catch (error) {
      res.send(error);
    }
  };
}

module.exports = StudentController;
