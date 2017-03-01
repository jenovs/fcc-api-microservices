const path = require('path');
const express = require('express');
const router = express.Router();
const upload = require('multer')();

router.use(express.static(path.join(__dirname + '/public')));

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    filename: req.file.originalname,
    size: req.file.size
  })
})

module.exports = router;
