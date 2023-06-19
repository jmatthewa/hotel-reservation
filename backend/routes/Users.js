const express = require('express')
const router = express.Router();
const userControllers = require('../controller/users')
const authMiddleware = require('../middleware/auth')



router.get('/', userControllers.getAllUser)

router.get('/:id/reservation', userControllers.getAllReservation)

router.get('/user', authMiddleware, userControllers.user)

router.post('/new', userControllers.newUser)

router.post('/login', userControllers.loginUser)

router.post('/logout', userControllers.logoutUser)


router.delete('/delete/:id', userControllers.deleteUser)



module.exports = router