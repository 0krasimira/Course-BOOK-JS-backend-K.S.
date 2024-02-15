const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username is required']
    },
    email : {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'email too short']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, "invalid password"]
    },
    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    signedUpCourses: [{
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }]
});

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 12)
    this.password= hash;
 });
 
 userSchema.virtual('repeatPassword')
     .get(function() {
       return this._repeatPassword;
     })
     .set(function(value) {
         this._repeatPassword = value;
     });
 
 userSchema.pre('validate', function(next) {
     if (this.password !== this._repeatPassword) {
         this.invalidate('repeatPassword', 'The passwords should be matching');
     }
     next();
 });

const User = mongoose.model('User', userSchema)

module.exports = User