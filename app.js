const express = require('express')
const bodyParser = require('body-parser')
const scripture = require('./routes/scripture.route')
const app = express()

const mongoose = require('mongoose')
const DB_URL = 'mongodb+srv://webuser:viQYx7NsQyCbB8w6@wontextscluster0-ef0w8.mongodb.net/test?retryWrites=true'

const mongoDB = process.env.MONODB_URI || DB_URL
const options = {
  dbName: 'WonTextsDB',
  useNewUrlParser: true
}
mongoose.connect(mongoDB, options)
  .then(() => {
    console.log('Connection to Atlas Cluster is successful')
  })
  .catch((err) => console.error('connection error: ', err))
mongoose.Promise = global.Promise



const port = 3844

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/scriptures', scripture)

app.listen(port, () => {
    console.log('Server is runner... : ', port)
})