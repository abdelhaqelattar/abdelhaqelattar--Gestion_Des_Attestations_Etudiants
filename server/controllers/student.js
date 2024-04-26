const Student = require('../models/Students');

const { validationResult } = require('express-validator/check');

exports.getStudent = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const email = req.body.email;
    const appogee = req.body.appogee;
    const CIN = req.body.CIN;

    Student.findOne({email: email, CIN: CIN, appogee: appogee})
        .then(student => {
            if (!student) {
                const error = new Error('Could not find student.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Student fetched.', student: student });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.checkStudent = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const email = req.body.email;
    const appogee = req.body.appogee;
    const CIN = req.body.CIN;

    Student.findOne({email: email, CIN: CIN, appogee: appogee})
        .then(student => {
            console.log("findone")
            if (!student) {
                const error = new Error('Could not find student.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Student fetched.', student_id: student._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
