const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    docType: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "DocType",
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    fields: {
      type: Object,
      required: true,
    },
    sent: {
      type: Boolean,
    },
    filename: {
      type: String,
    },
    status: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
