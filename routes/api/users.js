const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/UserCtrl');
const AvatarCtrl = require('../../controllers/AvatarCtrl');
const Auth = require('./userAuth');
const { ValidateAuth } = require('../../service/validation');
// const upload = require('../../service/upload');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

router.post('/auth/register', ValidateAuth, AuthCtrl.register);

router.post('/auth/login', ValidateAuth, AuthCtrl.login);

router.post('/auth/logout', Auth, AuthCtrl.logout);
router.get('/auth/current', Auth, AuthCtrl.currentUser);

// router.patch(
//   '/avatars',
//   Auth,
//   upload.single('avatar'),
//   AvatarCtrl.uploaderCtrl,
// );

const tempDir = path.join(process.cwd(), 'public');
const uploadDir = path.join(process.cwd(), 'public', 'avatars');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10000000,
  },
});

const upload = multer({
  storage,
});

router.patch('/avatars', upload.single('avatar'), async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const fileName = path.join(uploadDir, originalname);

  try {
    await fs.rename(tempName, fileName);
    res.json({
      statsus: 'success',
      code: 200,
      data: {
        result: {
          avatar: fileName,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempName);
    next(error);
  }
});

module.exports = router;
