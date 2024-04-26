const express = require('express');

const docTypeController = require('../controllers/docType');

const router = express.Router();

// GET /feed/posts
router.get('/', docTypeController.getDocTypes);

router.get('/:docTypeId', docTypeController.getDocType);

module.exports = router;
