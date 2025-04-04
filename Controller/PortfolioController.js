const PortfolioModel = require("../model/PortfolioModel");
const cloudinary = require("cloudinary").v2;
class PortfolioController {
  static InsertPortfolio = async (req, res) => {
    try {
      //   console.log(req.files)
      const file = req.files.image;
      const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "PortfolioImage",
      });

      const { title, city } = req.body;
      const data = new PortfolioModel({
        title: title,
        city: city,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "Portfolio added Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllPortfolio = async (req, res) => {
    try {
      //   console.log(req.files)
      const allPortfolio = await PortfolioModel.find();
      res.status(201).json({
        status: true,
        allPortfolio,
      });
    } catch (error) {
      res.send(error);
    }
  };
  static DeletePortfolio = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Portfolio not found" });
      }
      await PortfolioModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "Portfolio deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
  static UpdatePortfolio = async (req, res) => {
    try {
      const { id } = req.UserData;
      const { title, city } = req.body;
      if (req.files) {
        const Portfolio = await PortfolioModel.findById(id);
        const imageID = Portfolio.image.public_id;

        // delete image from cloudinary
        await cloudinary.uploader.destroy(imageID);
        // new image
        const imageFile = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          imageFile.tempFilePath,
          {
            folder: "PortfolioImage",
          }
        );

        var data = {
          title: title,
          city: city,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var data = {
          title: title,
          city: city,
        };
      }

      const updatePortfolio = await PortfolioModel.findByIdAndUpdate(id, data);
      res.status(200).json({
        success: true,
        updatePortfolio,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = PortfolioController;
