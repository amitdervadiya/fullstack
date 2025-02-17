const express = require('express')
const route = express.Router()
const handler  = require('../controller/handler')
const upload = require('../middleware/upload')
const auth = require("../middleware/authjwt")


route.post('/registerAdmin',handler.registeradmin)
route.post('/login',handler.login)
route.get('/viewAdmin',handler.viewadmin)
route.delete('/deleteAdmin/:id', handler.deleteadmin);
route.put('/updateAdmin/:id',handler.updateadmin)


module.exports = route