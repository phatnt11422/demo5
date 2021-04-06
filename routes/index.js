var express = require('express');
var router = express.Router();

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

var upload = multer({
    dest: './public/data/uploads/'
    , storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // gioi han file size <= 1MB

    }
}).single('avatar')

router.post('/profile', function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
 upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            return res.send("File size Maximum is 1MB.Please try again!!!")
        } else {
            res.send('OK nhe')
        }

    });
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
