const DocType = require('../models/DocTypes');

exports.getDocTypes = (req, res, next) => {
  DocType.find()
    .then(docTypes => {
      res.status(200).json({
        message: 'Fetched docTypes successfully.',
        docTypes: docTypes,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getDocType = (req, res, next) => {
  const docTypeId = req.params.docTypeId;
  DocType.findById(docTypeId)
    .then(docType => {
      if (!docType) {
        const error = new Error('Could not find docType.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'DocType fetched.', docType: docType });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
