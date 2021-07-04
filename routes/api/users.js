const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/UserCtrl');
const AvatarCtrl = require('../../controllers/AvatarCtrl');
const Auth = require('./userAuth');
const { ValidateAuth } = require('../../service/validation');
const upload = require('../../service/upload');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

router.post('/auth/register', ValidateAuth, AuthCtrl.register);

router.post('/auth/login', ValidateAuth, AuthCtrl.login);

router.post('/auth/logout', Auth, AuthCtrl.logout);
router.get('/auth/current', Auth, AuthCtrl.currentUser);

router.patch(
  '/avatars',
  Auth,
  upload.single('avatar'),
  AvatarCtrl.uploaderCtrl,
);

module.exports = router;
