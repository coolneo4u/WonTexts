const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const history = require('connect-history-api-fallback')

const app = express()

let mongoDB_user
let mongoDB_password
const secrets = require('./secrets.json')
if (app.get('env') !== 'production') {
  ;({ mongoDB_user, mongoDB_password } = secrets['development'])
}

const DB_URL = `mongodb+srv://${mongoDB_user}:${mongoDB_password}@wontextscluster0-ef0w8.mongodb.net/test?retryWrites=true`

const mongoDB = process.env.MONODB_URI || DB_URL
const options = {
  dbName: 'WonTextsDB',
  useNewUrlParser: true
}
mongoose
  .connect(mongoDB, options)
  .then(() => {
    console.log('Connection to Atlas Cluster is successful')
  })
  .catch(err => console.error('connection error: ', err))
// mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(history())
// Static option should be placed after connect-history-api-fallback
app.use(express.static(path.join(__dirname, 'public')))

// Routes
const scriptureRoutes = require('./routes/scripture.route')
app.use('/api/scriptures', scriptureRoutes)
const userRoutes = require('./routes/user.route')
app.use('/api/users', userRoutes)

// Vue route
const router = express.Router()
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'))
})
app.use('/', router)

const port = 3844
app.listen(port, () => {
  console.log(`Server is running : http://localhost:${port}`)
})
