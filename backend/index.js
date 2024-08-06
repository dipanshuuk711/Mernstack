const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const { default: nodemon } = require('nodemon')
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const app = express()

// connect our DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log("DB is Successfully connnected"))

// routes &  Middlewares
// those two middlewares make req.body accessible, otherwise it would be undefined
  const corsOptions = {
    origin: 'http://localhost:3000', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/product', productController)
app.use('/upload', uploadController)

// start our Server
app.listen(process.env.PORT, () => console.log("Server has been started Successfully"))



// server is on port 5000, client is on port 3000. 
//we are going to get a cors ERROR!!, but cors() removes that's error 