require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authenticationMiddleware = require('./middleware/authentication')

//create express app

const app = express()

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticationMiddleware)

app.use((req,res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(3000, () => {
        console.log('listening port 3000')
    })
})
.catch(err => console.log(err))

app.use(bodyParser.json())

//routes
app.get('/',(req, res) => {
    res.send('yay!')
})

const UsersRoute = require('./routes/Users');
app.use('/users', UsersRoute)

// app.use((error, req, res, next) => {
//     if (res.headerSent) {
//         return next(error)
//     }
//     res.status(error.code || 500)
//     res.json({ message: error.message || 'An unknown error occured'})
// })
const reservationRoute = require('./routes/reservation')
app.use('/reservation', reservationRoute)

const RoomsRoute = require('./routes/Rooms');
app.use('/rooms', RoomsRoute)

// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(__dirname + "public/dist/"))
//     app.get("*", ( req, res) => {
//         res.sendFile(__dirname + "public/dist/index.html")
//     })
// }
