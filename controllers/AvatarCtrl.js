const path = require('path');
const fs = require('fs/promises');
const uploadDir = path.join(process.cwd(), 'public');

const uploaderCtrl = async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const fileName = path.join(uploadDir, originalname);

  try {
    await fs.rename(tempName, fileName);
    return res.json({
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
};

module.exports = {
  uploaderCtrl,
};
