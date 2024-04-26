const ejs = require("ejs");
const PuppeteerHTMLPDF = require("puppeteer-html-pdf");

const Request = require("../models/Requests");
const Student = require("../models/Students");
const DocType = require("../models/DocTypes");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: "oussamaelnegraz@gmail.com",
    pass: "vlym exxv chvi mmme",
  },
});
exports.getRequests = (req, res, next) => {
  const Doctype = req.query.DocType || 1;
  // search
  const search = req.query.search || "";
  let totalItems;
  Request.find({ docType: Doctype, status: "Pending" })
    .populate("student")
    .then((requests) => {
      res.status(200).json({
        message: "Fetched requests successfully.",
        requests: requests,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createRequest = async (req, res, next) => {
  const docType = req.body.docType;
  const fields = req.body.fields;
  let creator;

  const email = fields.email;
  const appogee = fields.appogee;
  const CIN = fields.CIN;

  const student = await Student.findOne({
    email: email,
    CIN: CIN,
    appogee: appogee,
  }).lean();

  if (!student) {
    return res.status(401).json({
      message: "Student Informations not valid",
    });
  }

  const request = new Request({
    docType: docType,
    student: student["_id"],
    fields: fields,
    status: "Pending",
  });
  request
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Request created successfully!",
        request: request,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//// mounaim

exports.StatusRafused = async (req, res, next) => {
  const requestId = req.body.requestID; // Assuming you pass the request ID through the request parameters

  try {
    const request = await Request.findById(requestId);

    if (!request || request.status !== "Pending") {
      const error = new Error("Request not found");
      error.statusCode = 404;
      throw error;
    }

    request.status = "Refused";

    await request.save();

    const student = await Student.findById(request.student).lean();
    console.log(student);
    // Send mail to student
    const mailBody = {
      from: "oussamaelnegraz@gmail.com",
      to: student.email,
      subject: "Ensa Tetouan",
      html: `<h1>Hello ${student.name} your request has been refused !</h1>`,
    };

    await smtpTransport.sendMail(mailBody, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log("Email delivered successfully");
    });

    res.status(201).json({
      message: "Request status updated to refused successfully!",
      request: request,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.generateDocAndSendMail = async (req, res, next) => {
  const requestID = req.body.requestID;

  let request1 = await Request.findById(requestID)
    .populate("student")
    .populate("docType");

  try {
    request = request1.toObject();

    const student = request.student;
    const docType = request.docType;
    console.log(student.years_of_study);
    if (!student || !docType) {
      return res.status(401).json({
        message: "Informations not valid",
      });
    }

    const htmlPDF = new PuppeteerHTMLPDF();
    htmlPDF.setOptions({ format: "A4" });
    const html = await htmlPDF.readFile(`views/${docType.template}`, "utf8");
    const template = ejs.compile(html);
    const content = template({
      student: student,
      docType: docType,
      requests: request.fields,
    });

    const pdfBuffer = await htmlPDF.create(content);

    const fileName = `${student.name}_${Math.floor(Math.random() * 5000)}.pdf`;

    // Save the PDF file to the "docs" folder
    const filePath = path.join(__dirname, "..", "docs", fileName);
    fs.writeFile(filePath, "", function (err) {
      if (err) throw err;
      console.log("Replaced!");
    });

    fs.writeFileSync(filePath, pdfBuffer);

    const mailBody = {
      from: "oussamaelnegraz@gmail.com",
      to: student.email,
      subject: "Ensa Tetouan",
      html: `<h1>Hello ${student.name} this is your ${docType.title} !</h1>`,
      attachments: [
        {
          filename: fileName,
          path: filePath,
        },
      ],
    };

    await smtpTransport.sendMail(mailBody, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log("Email with attachment delivered successfully");
    });

    res.status(200).json({
      message: "Document generated and send with success!",
      to: student.email,
    });

    // add the filename to the request
    request1.filename = fileName;
    request1.status = "Accepted";
    request1.save();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// get all history
exports.getHistory = (req, res, next) => {
  // where not request.docType.title = "Reclamation"
  Request.find({
    status: { $ne: "Pending" },
    "docType.title": { $ne: "Reclamation" },
  })
    .populate("docType")
    .populate("student")
    .then((requests) => {
      res.status(200).json({
        message: "Fetched requests successfully.",
        requests: requests,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Download file from request id
exports.downloadFile = (req, res, next) => {
  const requestId = req.params.requestId;

  Request.findById(requestId)
    .then((request) => {
      const filePath = path.join(__dirname, "..", "docs", request.filename);
      res.download(filePath);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// resending mail to student from request id filename
exports.resendMail = async (req, res, next) => {
  const requestId = req.body.requestId;

  let request = await Request.findById(requestId)
    .populate("student")
    .populate("docType");

  try {
    request = request.toObject();

    const student = request.student;
    const docType = request.docType;
    console.log(student.years_of_study);
    if (!student || !docType) {
      return res.status(401).json({
        message: "Informations not valid",
      });
    }

    const mailBody = {
      from: "oussamaelnegraz@gmail.com",
      to: student.email,
      subject: "Ensa Tetouan",
      html: `<h1>Hello ${student.name} this is your ${docType.title} !</h1>`,
      attachments: [
        {
          filename: request.filename,
          path: path.join(__dirname, "..", "docs", request.filename),
        },
      ],
    };

    await smtpTransport.sendMail(mailBody, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log("Email with attachment delivered successfully");
    });

    res.status(200).json({
      message: "Document resend with success!",
      to: student.email,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
