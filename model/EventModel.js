const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
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
const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
