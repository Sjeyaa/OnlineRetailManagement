const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true,'Please enter name']
    },
    email:{
        type : String,
        required: [true,'Please enter email'],
        unique: true,
        validate: [validator.isEmail,'Please enter valid email address']
    },
    password:{
        type: String,
        required: [true,'Please Enter Password'],
        maxlength:[10,'Password Cannot exceed 10 characters'],
        select: false
    },
    avatar:{
        type: String,
        
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now
    }

})

/*userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,10)

})*/
userSchema.pre('save', async function(next) {
    try {
        // Check if the password is modified or new before hashing
        if (!this.isModified('password')) {
             next();
        }
        // Hash the password using bcrypt with a salt factor of 10
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
});


userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
}


userSchema.methods.isValidPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)

}

userSchema.methods.getResetToken = function(){
    //Generate Token
    const token = crypto.randomBytes(20).toString('hex');
    
    //Generate Hash and set to restPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token
}
let model = mongoose.model('User',userSchema)
module.exports = model;