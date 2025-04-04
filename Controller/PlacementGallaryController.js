const PlacementModel = require("../model/PlacementGallary");
const cloudinary = require("cloudinary").v2;
class PlacementController {
  static InsertPlacement = async (req, res) => {
    try {
      //   console.log(req.files)
      const file = req.files.image;
      const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "PlacementImage",
      });

      const { name, jobTitle, companyName } = req.body;
      const data = new PlacementModel({
        name: name,
        jobTitle: jobTitle,
        companyName: companyName,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "PlacementGallery added Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllPlacement = async (req, res) => {
    try {
      //   console.log(req.files)
      const allPlacement = await PlacementModel.find();
      res.status(201).json({
        status: true,
        allPlacement,
      });
    } catch (error) {
      res.send(error);
    }
  };
  static DeletePlacement = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Placement not found" });
      }
      await PlacementModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "Placement deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
  static UpdatePlacement = async (req, res) => {
    try {
      const { id } = req.UserData;
      const { name, jobTitle,companyName } = req.body;
      if (req.files) {
        const user = await PlacementModel.findById(id);
        const imageID = user.image.public_id;

        // delete image from cloudinary
        await cloudinary.uploader.destroy(imageID);
        // new image
        const imageFile = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          imageFile.tempFilePath,
          {
            folder: "PlacementImage",
          }
        );

        var data = {
          name: name,
          jobTitle: jobTitle,
          companyName:companyName,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          jobTitle: jobTitle,
          companyName:companyName,
        };
      }

      const updateUserProfile = await PlacementModel.findByIdAndUpdate(id, data,{new:true});
      res.status(200).json({
        success: true,
        updateUserProfile,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
}

module.exports = PlacementController;
