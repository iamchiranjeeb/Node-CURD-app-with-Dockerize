const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');



const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Not a valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            let lowerCase = /[a-z]/g;
            let upperCase = /[A-Z]/g;
            let specialCharacter = /[!@#$%?/\|:;~`^&*]/;
            let number = /[0-9]/g;
            if (val.length < 8) {
                throw new Error("Password Length Should be greater than or equal to 8.")
            } else if (!val.match(lowerCase)) {
                throw new Error("Password Should Include a Lower Case.")
            } else if (!val.match(upperCase)) {
                throw new Error("Password should Include an Upper Case.")
            } else if (!val.match(number)) {
                throw new Error("Password should include a Number.")
            } else if (!val.match(specialCharacter)) {
                throw new Error("Password should include a special Character")
            } else {
                return true;
            }
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

userSchema.pre('save',async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10)
    }
    console.log("cry cry")
    next();
})

const User = mongoose.model('User',userSchema)

module.exports = User;