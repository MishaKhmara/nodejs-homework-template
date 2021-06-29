const express = require("express");
const router = express.Router();
const AuthCtrl = require("../../controllers/UserCtrl");
const Auth = require("./userAuth")
const {ValidateAuth} = require("../../service/validation");

router.post("/auth/register", ValidateAuth, AuthCtrl.register)

router.post("/auth/login", ValidateAuth, AuthCtrl.login)

router.post("/auth/logout", Auth,  AuthCtrl.logout);
router.get('/auth/current', Auth, AuthCtrl.currentUser);



module.exports = router