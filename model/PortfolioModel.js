const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      Required: true,
    },
    city: {
      type: String,
      Required: true,
    },
    image: {
      public_id: {
        type: String,
        Required: true,
      },
      url: {
        type: String,
        Required: true,
      },
    },
  },
  { timestamps: true }
);
const PortfolioModel = mongoose.model("Portfolio", PortfolioSchema);

module.exports = PortfolioModel;
