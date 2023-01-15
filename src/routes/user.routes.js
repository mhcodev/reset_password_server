const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

const userController = new UserController();

router.post(
  '/new',
  [],
  userController.save
);

router.post(
  '/login',
  [],
  userController.login
);

module.exports = router;