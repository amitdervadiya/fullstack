const multer = require('multer');

const Storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , "public/manager/");
    },
    filename : (req , file , cb) => {
        cb(null , file.fieldname + "-" + Date.now());
    }
})

const manageimg = multer({storage : Storage}).single('image');

module.exports = manageimg