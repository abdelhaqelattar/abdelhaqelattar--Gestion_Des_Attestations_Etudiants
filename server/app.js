const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const docsRoutes = require('./routes/docs');
const authRoutes = require('./routes/auth');
const docTypesRoutes = require('./routes/docTypes');
const studentRoutes = require('./routes/student');
const requestRoutes = require('./routes/request');
const dashboardRoutes = require('./routes/dashboard');

const bcrypt = require("bcryptjs");
const User = require("./models/user");
const DocTypes = require('./models/DocTypes');


const app = express();
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/docs', docsRoutes);
app.use('/auth', authRoutes);
app.use('/docTypes', docTypesRoutes);
app.use('/student', studentRoutes);
app.use('/request', requestRoutes);
app.use('/dashboard', dashboardRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    console.log("returning")
    res.status(status).json({message: message, data: data});
});

mongoose
    .connect(
        'mongodb+srv://oussamaelnegraz:VlkfriFaw25U3lm7@clustergl.iudyn5y.mongodb.net/Project-GL?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(result => {
        // Check if any user exists
        return User.findOne();
    })
    .then(user => {
        if (!user) {
            // No user exists, so create a new one
            const email = "admin@admin.com";
            const name = "Admin";
            const password = "password";

            return bcrypt
                .hash(password, 12)
                .then(hashedPw => {
                    const newUser = new User({
                        email: email,
                        password: hashedPw,
                        name: name
                    });
                    return newUser.save();
                })
                .then(result => {
                    console.log('Admin User Created');
                });
        } else {
            console.log('User already exists');
        }
    })
    .then(() => {
        app.listen(5000, () => console.log('Server is running on port 5000'));
    })
    // .then(result => {
    //     app.listen(8080);
    // })
    .catch(err => console.log(err));
