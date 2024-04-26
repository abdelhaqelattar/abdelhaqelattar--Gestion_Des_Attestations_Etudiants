const Claim = require('../models/Claims');

exports.getClaims = (req, res, next) => {
  Claim.find()
    .then(claims => {
      res.status(200).json({
        message: 'Fetched claims successfully.',
        claims: claims,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getClaim = (req, res, next) => {
  const claimId = req.params.claimId;
  Claim.findById(claimId)
    .then(claim => {
      if (!claim) {
        const error = new Error('Could not find claim.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Claim fetched.', claim: claim });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
