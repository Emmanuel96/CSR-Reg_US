function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/view-application')
  }
  next()
}
module.exports = checkNotAuthenticated