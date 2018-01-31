var express = require('express');
var multer = require('multer');

var router = express.Router();

var storage = multer.diskStorage({
  destination: './public/images/estates/',
  filename (req, file, cb) {
    cb(null,
      file.fieldname + '-' + Date.now() + '.' +
      file.originalname.split('.')[file.originalname.split('.').length - 1]
    );
  }
});

const upload = multer({ storage }).single('file');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/estate/uploadImg', function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      res.json({
        error: false,
        result: req.file.filename
      });
    }
  });
});

module.exports = router;
