const express = require('express')
const router = express.Router();
const reservationController = require('../controller/reservation')


router.get('/get/:id', reservationController.getAllByUser)
router.get('/', reservationController.getAll)

router.post('/new', reservationController.newReservation)

router.delete('/delete/:id' , reservationController.deleteReservation)



module.exports = router