const checkAuthenticated = require('../passport/checkAuthenticated');

function setReadOnly(req, res, next) {
    req.isReadOnly = req.query.readOnly === 'true';
    next();
  }

  // Ensure checkAuthenticated exists  
  module.exports = { checkAuthenticated, setReadOnly }; 