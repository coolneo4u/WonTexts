const express = require('express')
const router = express.Router()
const scriptureController = require('../controllers/scripture.controller')
const auth = require('../auth')

router.post('/create', auth.required, scriptureController.create)
router.get('/get', auth.optional, scriptureController.get)
router.put('/update', auth.required, scriptureController.update)
router.delete('/delete', auth.required, scriptureController.delete)
router.get('/indexes', auth.optional, scriptureController.indexes)

module.exports = router
