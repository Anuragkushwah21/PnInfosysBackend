const OurTeamModel = require("../model/OurTeamModel");
const cloudinary = require("cloudinary").v2;
class OurTeamController {
  static InsertOurTeam = async (req, res) => {
    try {
      // Get the uploaded file
      const file = req.files.image;

      // Upload the image to Cloudinary with transformations
      const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "OurTeamImage",
        transformation: [
          { width: 1000, height: 1000, crop: "fill", gravity: "auto" }, // Crop and center the image
          { radius: "max" }, // Make it circular
          { background: "rgb:262c35" }, // Dark background
        ],
      });

      // Extract form data
      const { name, description } = req.body;

      // Save data to the database
      const data = new OurTeamModel({
        name: name,
        description: description,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url, // Circular image URL
        },
      });

      await data.save();

      res.status(201).json({
        status: "success",
        message: "Our Team added Successfully",
        imageUrl: myCloud.secure_url, // Return the image URL in response
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  };
  static GetAllOurTeam = async (req, res) => {
    try {
      //   console.log(req.files)
      const allOurTeam = await OurTeamModel.find();
      res.status(201).json({
        status: true,
        allOurTeam,
      });
    } catch (error) {
      res.send(error);
    }
  };
  static DeleteOurTeam = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "OurTeam not found" });
      }
      await OurTeamModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "OurTeam deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
  static UpdateOurTeam = async (req, res) => {
    try {
      const { id } = req.UserData;
      const { name, description } = req.body;
      if (req.files) {
        const Team = await OurTeamModel.findById(id);
        const imageID = Team.image.public_id;

        // delete image from cloudinary
        await cloudinary.uploader.destroy(imageID);
        // new image
        const imageFile = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          imageFile.tempFilePath,
          {
            folder: "OurTeamImage",
          }
        );

        var data = {
          name: name,
          description: description,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          description: description,
        };
      }

      const updateTeam = await OurTeamModel.findByIdAndUpdate(id, data);
      res.status(200).json({
        success: true,
        updateTeam,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = OurTeamController;
