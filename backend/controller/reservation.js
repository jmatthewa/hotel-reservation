const Reservations = require('../models/reservation')
const User = require('../models/Users')
const mongoose = require('mongoose')
const Room = require('../models/Rooms')

const getAll =  async (req, res) => {
  const reservation = await Reservations.find();
  res.json(reservation)
}

const newReservation = async ( req , res ) => {
    const { checkIn, checkOut, totalGuest, guestDetails,roomDetails } = req.body

    const newReservation = new Reservations({ 
        checkIn, 
        checkOut, 
        totalGuest, 
        guestDetails,
        roomDetails
    })
    let user,room

    try {
      user = await User.findById(guestDetails).populate('reservationDetails')
    } catch {
        return res.json({ error: 'Reservation faiiled'})
    }

    if(!user) {
      return res.json({ error: 'Reservation faiiled cannot find user'})
    }

    try{
      room = await Room.findById(roomDetails)
    } catch {
      return res.json(({ error : 'No rooms available'}))
    }

    if(!room) {
      return res.json({error : 'No Rooms find'})
    }


    try {
      const sess = await mongoose.startSession()
      sess.startTransaction()
      await newReservation.save({ session: sess })
      user.reservationDetails.push(newReservation)
      room.reservationDetails.push(newReservation)
      await user.save({ session: sess })
      await room.save({ session: sess })
      await sess.commitTransaction()
      res.json({ message: 'Successful added', user: user})
    } catch(err) {
        return res.json({ error: 'Reservation faiiled' , err})
    }

}

const getAllByUser = async ( req, res ) => {
  let userWithReservation  
  try {
    userWithReservation = await User.find({
      _id : req.params.id
    }).populate('reservationDetails')
  } catch (err){
    res.json({error:err})
  }
  if(!userWithReservation || userWithReservation.length === 0) {
    return res.json({message: 'No reservation find'})
  }

//   res.json({ reservationDetails: userWithReservation.reservationDetails.map(reservation => reservation.toObject({getterse: true}))
// })
res.json({user: userWithReservation})
}

const deleteReservation = async ( req , res ) => {
  let deleteReserve
  try {
    deleteReserve = await Reservations.findById({
      _id : req.params.id
    }).populate('guestDetails').populate('roomDetails')
 
  } catch {
    return res.json({error: 'Could not delete reservation',})
  }

  if(!deleteReserve) {
    return res.json({error: 'Could not find reservation',})
  }


  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await deleteReserve.deleteOne({ session: sess })
    deleteReserve.guestDetails.reservationDetails.pull(deleteReserve)
    deleteReserve.roomDetails.reservationDetails.pull(deleteReserve)
    await deleteReserve.guestDetails.save({ session: sess })
    await deleteReserve.roomDetails.save({ session: sess })
    await sess.commitTransaction()
    // res.json({message: 'Successfully Deleted' , id: deleteReserve})

    const user = await User.findById(deleteReserve.guestDetails._id).populate('reservationDetails')
    res.json({message: 'Successfully Deleted', user : user})

  } catch (error) {
    return res.json({error: 'Could not a delete reservation',})
  }
}

exports.newReservation = newReservation
exports.getAllByUser = getAllByUser
exports.deleteReservation = deleteReservation
exports.getAll = getAll