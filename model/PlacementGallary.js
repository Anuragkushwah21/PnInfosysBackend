const mongoose = require("mongoose");

const PlacementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    jobTitle: {
      type: String,
      Required: true,
    },
    companyName: {
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
const PlacementModel = mongoose.model("Placement", PlacementSchema);

module.exports = PlacementModel;
