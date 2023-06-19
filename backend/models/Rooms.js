const mongoose = require('mongoose')

const RoomsSchema = new mongoose.Schema({

    roomName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    facilities: [{
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }],
    size:  {
        type: Number,
        required: true
    },
    maxPerson:  {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    reservationDetails : [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Reservation'
    }]
})

module.exports = mongoose.model('Room', RoomsSchema)