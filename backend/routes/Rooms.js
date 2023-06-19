const express = require('express')
const router = express.Router()
const Room = require('../models/Rooms')
const roomController = require('../controller/rooms')

router.get('/', roomController.getAllRoom)

router.post('/new',roomController.addNewRoom)

router.get('/get/:id', roomController.getRoomById)

router.post('/getrooms' , roomController.specificRooms)


module.exports = router