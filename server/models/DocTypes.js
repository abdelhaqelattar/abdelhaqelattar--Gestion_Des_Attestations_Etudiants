const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: false,
  },
  template: {
    type: String,
    require: false,
  },
  formElements: [
    {
      label: {
        type: String,
        required: true,
      },
      dblabel: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("DocType", postSchema);
