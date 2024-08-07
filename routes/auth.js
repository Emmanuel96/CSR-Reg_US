const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController')
const checkNotAuthenticated = require('../passport/checkNotAuthenticated')
const passport = require("../passport/setup")

//POST routes

router.post('/login',
  passport.authenticate('local', { 
    failureMessage: false,
  }),
  function(req, res) {
    res.json({
      userID: req.user._id.toString()
    })
  });

router.get('/user/find', AuthController.findUserByEmail)

router.get('/createApplication', AuthController.createSmallBusinessApplication)

router.post('/register', AuthController.post_register);

router.post('/api/auth/forgot_password', AuthController.post_forgot_password);

router.post('/api/auth/reset_password/:token', AuthController.post_reset_password);

router.post("/api/complete_registration", AuthController.post_complete_registration)

//DELETE route

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

// GET routes

router.get('/login', checkNotAuthenticated, AuthController.get_login);

router.get('/register', checkNotAuthenticated, AuthController.get_register);

router.get("/complete_registration", checkNotAuthenticated, AuthController.get_complete_registration)

router.get('/forgot_password', checkNotAuthenticated, AuthController.get_forgot_password)

router.get('/reset_password/:token', AuthController.get_reset_password)

module.exports = router;