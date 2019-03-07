const express = require('express')
const router = express.Router()
const scriptureController = require('../controllers/scripture.controller')

router.post('/create', scriptureController.create)
router.get('/get', scriptureController.get)
router.put('/update', scriptureController.update)
router.delete('/delete', scriptureController.delete)
router.get('/indexes', scriptureController.indexes)

module.exports = router
