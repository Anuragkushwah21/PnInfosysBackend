const TechnologyModel = require("../model/TechnologiesModel");
const cloudinary = require("cloudinary").v2;
class TechnologyController {
  static InsertTechnology = async (req, res) => {
    try {
      //   console.log(req.files)
      const file = req.files.image;
      const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "TechnologyImage",
      });

      const { title, description } = req.body;
      const data = new TechnologyModel({
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
        message: "Technology added Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllTechnology = async (req, res) => {
    try {
      //   console.log(req.files)
      const allTechnology = await TechnologyModel.find();
      res.status(201).json({
        status: true,
        allTechnology,
      });
    } catch (error) {
      res.send(error);
    }
  };
  static DeleteTechnology = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Technology not found" });
      }
      await TechnologyModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "Technology deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
  //  static UpdateTechnology = async (req, res) => {
  //   try {
  //     const { id } =  req.UserData;
  //     const { title, description} = req.body;
  //     if (req.files) {
  //       const Technology = await TechnologyModel.findById(id);
  //       const imageID = Technology.image.public_id;

  //       // delete image from cloudinary
  //       await cloudinary.uploader.destroy(imageID);
  //       // new image
  //       const imageFile = req.files.image;
  //       const imageUpload = await cloudinary.uploader.upload(
  //         imageFile.tempFilePath,
  //         {
  //           folder: "TechnologyImage",
  //         }
  //       );

  //       var data = {
  //         title: title,
  //         description: description,
  //         image: {
  //           public_id: imageUpload.public_id,
  //           url: imageUpload.secure_url,
  //         },
  //       };
  //     } else {
  //       var data = {
  //         title: title,
  //         description: description,
  //       };
  //     }

  //     const updateTechnology = await TechnologyModel.findByIdAndUpdate(id, data);
  //     res.status(200).json({
  //       success: true,
  //       updateTechnology,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  

  // static UpdateTechnology = async (req, res) => {
  //   const { id } = req.params;
  //   const { title, description } = req.body;
  
  //   try {
  //     const technology = await TechnologyModel.findById(id);
  //     if (!technology) {
  //       return res.status(404).json({ message: "Technology not found" });
  //     }
  
  //     let imageUrl = technology.image.url; // Keep existing image URL
  //     let publicId = technology.image.public_id; // Keep existing public_id
  
  //     // Check if new image is uploaded
  //     if (req.files && req.files.image) {
  //       const imageFile = req.files.image;
  
  //       // Delete the old image from Cloudinary
  //       if (publicId) {
  //         await cloudinary.uploader.destroy(publicId);
  //       }
  
  //       // Upload new image
  //       const imageUpload = await cloudinary.uploader.upload(imageFile.tempFilePath, {
  //         folder: "TechnologyImage",
  //       });
  
  //       imageUrl = imageUpload.secure_url;
  //       publicId = imageUpload.public_id;
  //     }
  
  //     // Update the document in the database
  //     const updatedTechnology = await TechnologyModel.findByIdAndUpdate(
  //       id,
  //       { title, description, image: { url: imageUrl, public_id: publicId } },
  //       { new: true }
  //     );
  
  //     res.json({ message: "Technology updated successfully", data: updatedTechnology });
  //   } catch (error) {
  //     res.status(500).json({ message: "Error updating technology", error: error.message });
  //   }
  // };

  static UpdateTechnology = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      if (req.files) {
        const Technology = await TechnologyModel.findById(id);
        const imageID = Technology.image.public_id;

        // delete image from cloudinary
        await cloudinary.uploader.destroy(imageID);
        // new image
        const imageFile = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          imageFile.tempFilePath,
          {
            folder: "TechnologyImage",
          }
        );
      }

      const updateTechnology = await TechnologyModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      res.status(200).json({
        success: true,
        updateTechnology,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
}

module.exports = TechnologyController;
