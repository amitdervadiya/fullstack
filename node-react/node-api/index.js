const express = require('express')
const port = 1008;
const path = require('path')
const app = express()
const schema = require('./model/firstschema')
const db = require('./config/db')
const cors  = require('cors')
const route = require("./route/route");

app.use(express.urlencoded())
 app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use(json())
app.use('/',route)



app.listen(port, (err) => {
    err ? console.log(err) : console.log('start on port 1008')
})