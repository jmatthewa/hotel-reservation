const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    
    },
    reservationDetails : [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Reservation'
    }],
    refresh_token: String
})


UsersSchema.virtual('fullName').get(function() {
    return `${this.fName} ${this.lName}`
})

UsersSchema.virtual('id').get(function() {
    return `${this._id}`
})

module.exports = mongoose.model('User', UsersSchema)