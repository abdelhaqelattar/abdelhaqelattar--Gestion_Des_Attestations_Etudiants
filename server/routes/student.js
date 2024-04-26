const express = require('express');
const studentController = require('../controllers/student');
const {body} = require('express-validator/check');
const {isRequired} = require("nodemon/lib/utils");

const router = express.Router();

router.get('/', [
    body('email')
        .trim()
        .isEmail(),
    body('appogee')
        .trim()
        .isLength({min: 6}),
    body('CIN')
        .trim()
        .isLength({min: 6})
], studentController.getStudent);

router.post('/check', [
    body('email')
        .trim()
        .isEmail(),
    body('appogee')
        .trim()
        .isLength({min: 6}),
    body('CIN')
        .trim()
        .isLength({min: 6})
], studentController.checkStudent);

module.exports = router;
