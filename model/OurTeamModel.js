const mongoose = require("mongoose");

const OurTeamSchema = new mongoose.Schema(
  {
    name: {
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
const OurTeamModel = mongoose.model("OurTeam", OurTeamSchema);

module.exports = OurTeamModel;
