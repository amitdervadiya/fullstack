const multer = require('multer');

const Storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , "public/employee/");
    },
    filename : (req , file , cb) => {
        cb(null , file.fieldname + "-" + Date.now());
    }
})

const employeeimg = multer({storage : Storage}).single('image');

module.exports = employeeimg