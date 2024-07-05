const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    device: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Click = mongoose.model("Click", clickSchema);

module.exports = Click;
