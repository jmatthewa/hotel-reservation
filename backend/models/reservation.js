const mongoose = require('mongoose')
const moment = require('moment')
const reservationSchema = new mongoose.Schema({
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    totalGuest : {
        type: Number,
        required: true
    },
    guestDetails : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    roomDetails : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Room'
    },

},
{
    toJSON: {virtuals: true},
},

)

reservationSchema.virtual('formattedCheckIn').get(function() {
    const date = moment(this.checkIn)
    const formattedDate = date.format('MMMM DD, YYYY')
    return formattedDate
})
reservationSchema.virtual('formattedCheckOut').get(function() {
    const date = moment(this.checkOut)
    const formattedDate = date.format('MMMM DD, YYYY')
    return formattedDate
})


module.exports = mongoose.model('Reservation', reservationSchema)