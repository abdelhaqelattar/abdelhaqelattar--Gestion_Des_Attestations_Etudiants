const express = require("express");

const requestController = require("../controllers/request");

const router = express.Router();

// GET /feed/posts
router.get("/", requestController.getRequests);

router.post('/refuse', requestController.StatusRafused);


// POST /feed/post
router.post("/", requestController.createRequest);

router.post("/generate", requestController.generateDocAndSendMail);

// History
router.get("/history", requestController.getHistory);

// Download file
router.get("/download/:requestId", requestController.downloadFile);

// Resend mail
router.post("/resend", requestController.resendMail);

module.exports = router;
