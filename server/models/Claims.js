const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaimSchema = new Schema(
  {
    subject: {
      type: text,
      required: true
    },
      message: {
      type: text,
      required: true
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Claim', ClaimSchema);
