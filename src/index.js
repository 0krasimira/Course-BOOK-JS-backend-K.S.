const express = require('express')
const app = express()
const expressConfigurator = require('./config/expressConfigurator')
const routes = require('./routes')
const handlebarsConfigurator = require('./config/handlebarsConfigurator')
const mongoose = require('mongoose')

expressConfigurator(app)
handlebarsConfigurator(app)

app.use('/', routes)



mongoose.connect("mongodb://127.0.0.1:27017/nameofDB").then(() => {console.log("DB connected succesfully.");
app.listen(3000, () => 
    console.log(`Server is listening on port 3000...`))
}).catch(err => console.log("Cannot connect to DB."))
