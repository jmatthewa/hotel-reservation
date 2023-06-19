
const Room = require('../models/Rooms')
const mongoose = require('mongoose')

const addNewRoom =  async ( req, res ) => {

    const { roomName, description, facilities, size,maxPerson,price,image } = req.body;
    const newRoom = new Room({
        roomName,
        description,
        facilities,
        size,
        maxPerson,
        price,
        image,
        reservationDetails:[] 

    })
    const savedRoom = await newRoom.save()
    res.json(savedRoom)
}

const getAllRoom =  async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms)
}
const getRoomById =  async ( req, res ) => {
    const roomFind = await Room.findById({
        _id: req.params.id
    })
    res.json(roomFind)
}

const specificRooms = async ( req , res ) => {
    const arrayOfIds = req.body.arrayOfIds
    const objectIds = arrayOfIds.map(id => mongoose.Types.ObjectId(id))

    const rooms = await Room.find({
        _id: {$in: objectIds} 
    })
    res.json(rooms)
}

exports.addNewRoom = addNewRoom
exports.getAllRoom = getAllRoom
exports.getRoomById = getRoomById
exports.specificRooms =specificRooms

// roomName: 'Standard Room',
// description:
// 'The Standard Room is a cozy and comfortable room that is perfect for solo travelers or couples. It features a queen-size bed, a flat-screen TV, and a private bathroom with a shower. The room also has a minibar and free Wi-Fi.',
// facilities: [
// { name: 'Wifi', icon:"fa-solid fa-wifi"},
// { name: 'Coffee', icon:"fa-solid fa-mug-saucer" },
// { name: 'Bath', icon: "fa-solid fa-bath"},
// { name: 'Parking Space', icon: "fa-solid fa-square-parking" },
// { name: 'Swimming Pool', icon: "fa-solid fa-person-swimming" },
// { name: 'Breakfast', icon: "fa-solid fa-hotdog"},
// { name: 'GYM', icon: "fa-solid fa-stopwatch" },
// { name: 'Drinks', icon: "fa-solid fa-martini-glass-citrus" },
// ],
// size: 250,
// maxPerson: 8,
// price: 400,
// image: '8.jpg',

