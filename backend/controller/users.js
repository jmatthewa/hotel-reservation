
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, '-password').populate('reservationDetails');
    res.json(users);
  } catch {
    res.status(404).json({message: 'Could not find user'})
  }
  
    
}

const newUser = async (req, res) => {
    const { fName, lName, email, password } = req.body;

    const foundUser = await User.findOne({
        email : email
       })
       if(foundUser) return res.json({error: 'email is already exists'})
      try {
   
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ 
          fName, 
          lName, 
          email, 
          password:hashedPassword, 
          reservationDetails:[] 
        });
       await newUser.save();    
       res.json({message: "Sucessfully created", user: newUser});
      } catch (err) {
        return res.json({ error: 'Failed to register user' });
      }

   
      
}

const loginUser = async ( req, res ) => {
    const {email, password } = req.body
 
    try {
       const userDetails = await User.findOne({email}).populate('reservationDetails')
        if(!userDetails){
            return res.json({ error: 'Invalid email or Password' })
        } 
        bcrypt.compare(password, userDetails.password, async (err, result) => {
            if(err || !result) {

                return res.json({ error: 'Invalid Pasword'})
                
            }

          
            await userDetails.save()
            const accessToken = jwt.sign(
              {
                id: userDetails.id
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: '1800s'
              }
            )
          
            const refreshToken = jwt.sign(
              {
                id: userDetails.id
              },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: '1d'
              }
            )
        
            userDetails.refresh_token = refreshToken
            res.cookie('refresh_token', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
            res.status(200).json({
              user: userDetails,
              access_token: accessToken
            });
          
        })

      
        
    } catch {
        return res.json({ error: 'Failed to authenticate user' });
    }


    
}

const logoutUser = async (req, res) => {
  const cookies = req.cookies

  if(!cookies.refresh_token) return res.sendStatus(204)

  const refreshToken = cookies.refresh_token
  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user){
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
    return res.sendStatus(204)
  }

  user.refresh_token = null
  await user.save()

  res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
  res.sendStatus(204)
}

const user = async (req, res) => {
  const user = req.user

  return res.json(user)

}

const deleteUser = async (req, res) => {
    const userDelete = await User.findByIdAndDelete({
        _id: req.params.id
    })
    res.json(userDelete)
}

const getAllReservation = async (req, res) => {
  let foundUser 
  try {
    foundUser = await User.findById({ _id : req.params.id }).populate('reservationDetails')
  } catch {
    res.json({error: 'Could not find reservation'})
  }
  
}

exports.newUser = newUser
exports.loginUser = loginUser
exports.deleteUser = deleteUser
exports.getAllUser = getAllUser
exports.logoutUser = logoutUser
exports.getAllReservation =getAllReservation
exports.user = user