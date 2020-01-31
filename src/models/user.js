const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 
var total = 0

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Email not valid')
            }
        }
    },
  
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value)
        {
            if(value.includes('password'))
            {
                throw new Error('password cannot contains "password"')
            }
        }
    },
    total: {
        type: Number
    },

    tokens: [{
        token: {
        type: String,
        required: true
        }
    }]
    },
    {
        timestamps: true
    })

userSchema.virtual('tasks', {
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email}) 
    if(!user){
        throw new error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password) 
     if(!isMatch) {
         throw new error('Unable to Login!')
     }

     return user
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
    }



userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() } , 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}


userSchema.methods.addBlog = async function () {
    const blog = this
  
    total+=1
  
    await blog.save()
    if(total>5) {
        throw new error("Sorry! Cannot add more blogs")
    }

    return total
  }


userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports=User