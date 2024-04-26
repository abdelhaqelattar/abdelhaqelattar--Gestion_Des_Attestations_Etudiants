const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  appogee: {
    type: String,
    required: true,
  },
  CNE: {
    type: String,
    required: true,
  },
  CNI: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  place_of_birth: {
    type: Date,
    required: true,
  },

  years_of_study: [
    {
      year: {
        type: Number,
        required: true,
      },
      semesters: [
        {
          semester: {
            type: Number,
            required: true,
          },
          subjects: [
            {
              name: {
                type: String,
                required: true,
              },
              grade: {
                type: Number,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);
