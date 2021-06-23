const express = require("express");
const router = express.Router();
const Auth = require("../../controllers/UserCtrl");

router.post("/auth/register",Auth.register)

router.post("/auth/login",Auth.login)

// router.post('/auth/logout', guard, userController.logout);

module.exports = router