const express = require('express')
const router = express.Router()
const scriptureController = require('../controllers/scripture.controller')

router.post('/create', scriptureController.create)
router.get('/verse', scriptureController.getVerse)
router.get('/update', scriptureController.updateVerse)
router.delete('/delete', scriptureController.deleteVerse)

module.exports = router