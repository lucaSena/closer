// https://appdividend.com/2019/02/14/node-express-image-upload-and-resize-tutorial-example/

const multer = require('multer')

const upload = multer({
    limits: {
      fileSize: 4 * 1024 * 1024,
    }
  });
  
module.exports = upload