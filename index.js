const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000

const app = express()
const urlencodedParser = express.urlencoded()
app.use(express.json())
app.use('/', urlencodedParser, authRouter)

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://khan:12345@cluster0.fxhhdbb.mongodb.net/?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`server work ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()