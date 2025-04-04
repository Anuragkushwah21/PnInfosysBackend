const mongoose = require("mongoose");

const TechnologySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      Required: true,
    },
    description: {
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
const TechnologyModel = mongoose.model("Technology", TechnologySchema);

module.exports = TechnologyModel;
