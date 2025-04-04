const EventModel = require("../model/EventModel");
const cloudinary = require("cloudinary").v2;
class EventController {
  static InsertEvent = async (req, res) => {
    try {
      //   console.log(req.files)
      const file = req.files.image;
      const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "EventImage",
      });

      const { title, description } = req.body;
      const data = new EventModel({
        title: title,
        description: description,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "Event added Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllEvent = async (req, res) => {
    try {
      //   console.log(req.files)
      const allEvent = await EventModel.find();
      res.status(201).json({
        status: true,
        allEvent,
      });
    } catch (error) {
      res.send(error);
    }
  };
  static DeleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Event not found" });
      }
      await EventModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "Event deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
  static UpdateEvent = async (req, res) => {
    try {
      const { id } = req.UserData;
      const { title, description } = req.body;
      if (req.files) {
        const user = await EventModel.findById(id);
        const imageID = user.image.public_id;

        // delete image from cloudinary
        await cloudinary.uploader.destroy(imageID);
        // new image
        const imageFile = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          imageFile.tempFilePath,
          {
            folder: "EventImage",
          }
        );

        var data = {
          title: title,
          description: description,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var data = {
          title: title,
          description: description,
        };
      }

      const updateEvent = await EventModel.findByIdAndUpdate(id, data,{new:true});
      res.status(200).json({
        success: true,
        updateEvent,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = EventController;
