const NoticeModel = require("../model/NoticeModel");
class NoticeController {
  static InsertNotice = async (req, res) => {
    try {
      const {title, notice, link } = req.body;
      const data = new NoticeModel({
        title:title,
        notice: notice,
        link: link,
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "Notice added Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllNotice = async (req, res) => {
    try {
      // Get all notices
      const allNotice = await NoticeModel.find();
      // Count the number of notices
      const noticeCount = await NoticeModel.countDocuments();
      res.status(201).json({
        status: true,
        allNotice,
        noticeCount, // Return the count of notices
      });
    } catch (error) {
      res.send(error);
    }
  };
  static DeleteNotice = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Notice not found" });
      }
      await NoticeModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "Notice deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
  static UpdateNotice = async (req, res) => {
    try {
      const { id } = req.params; // Get ID from request parameters
      const { title, notice, link } = req.body;
  
      // Data object to update
      const data = { title, notice, link };
  
      // Find and update notice
      const updateNotice = await NoticeModel.findByIdAndUpdate(id, data, { new: true });
  
      if (!updateNotice) {
        return res.status(404).json({ success: false, message: "Notice not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Notice updated successfully",
        updateNotice,
      });
    } catch (error) {
      console.error("Error updating notice:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
}

module.exports = NoticeController;
