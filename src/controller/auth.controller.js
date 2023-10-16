const User = require('../models/user.model')
const { userRegistrationSchema } = require('../utils/validators')

module.exports.registerUser = async(req, res)=>{
    
    if(!req.body){
        return res.status(400).json({error: 'Request body can not be empty'})
    }

    const { firstName, lastName, email, password } = req.body

    const {error} = userRegistrationSchema.validate({ firstName, lastName, email, password })
    if(error){
        return res.status(422).json({error: error.message})
    }

    const user = await User.findOne({email})
    if(!user){
        await new User({ firstName, lastName, email, password }).save()
        return res.status(201).json({message: 'User account created'})
    }
    return res.status(409).json({error: 'This email is registered'})
}