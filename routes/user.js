  const express = require('express');
  const router = express.Router();
  const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync.js');
 const { saveRedirectUrl } = require('../middleware.js');
  const userController = require('../Controller/user.js');


router.route('/signup')
.get(userController.rendersignup)
.post(wrapAsync(userController.signup));

router.route('/login')
.get(userController.renderLoginform)
.post(saveRedirectUrl, passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}),userController.login);


router.get('/logout', userController.logout);
module.exports = router;