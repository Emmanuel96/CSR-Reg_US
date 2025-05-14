var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.redirect('/login');
// });

// module.exports = router;

router.get('/', function (req, res, next) {
  const { readOnly, applicationId } = req.query;

  if (readOnly === 'true' && applicationId) {
    // Store in session
    req.session.readOnly = true;
    req.session.applicationId = applicationId;

    return res.redirect('/company_details');
  }

  res.redirect('/login');
});

module.exports = router;
