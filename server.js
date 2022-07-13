require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')

// routes dependencies
const userRoutes = require("./routes/userRouter");


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileupload({
    useTempfiles: true
}))

// routes
app.use("/user", userRoutes);


app.use('/', (req, res, next) => {
    res.json({msg: "Welcome to our App" })
})
//Connect to Mongodb
const URI = process.env.MONGODB_URI
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to MongoDB")
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})