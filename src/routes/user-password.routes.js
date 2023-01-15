const express = require('express');
const UserPasswordController = require('../controllers/user-password.controller');

const router = express.Router();

const userPasswordController = new UserPasswordController();

router.post(
  '/send/:email',
  [],
  userPasswordController.sendEmailToResetPassword
);

router.post(
  '/reset/:token',
  [],
  userPasswordController.resetPassword
);

module.exports = router;