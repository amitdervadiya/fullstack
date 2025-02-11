const express = require('express')
const route = express.Router()
const handler  = require('../controller/handler')
const upload = require('../middleware/upload')
route.get('/',handler.getadmin)
route.get('/viewAdmin',handler.viewadmin)
route.post('/addAdmin',upload,handler.addadmin)
route.delete('/deleteAdmin',handler.deleteadmin)
route.put('/updateAdmin',upload,handler.updateadmin)

module.exports = route