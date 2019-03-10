const router = require('express').Router()
const auth = require('../auth')

const { create, login, current } = require('../controllers/user.controller')

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, create)

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, login)

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, current)

module.exports = router
