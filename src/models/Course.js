const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "All fields are mandatory"],
        minLength : [5, 'Title should be at least 5 characters long']
    },
    type : {
        type: String,
        required: [true, "All fields are mandatory"],
        minLenght: [3, 'Type should be at least 3 characters long']
    },
    certificate:{
        type: String,
        required: [true, "All fields are mandatory"],
        minLength: [2, 'Certificate should be at least 2 characters long']
    },
    image:{
        type: String,
        required: [true, "All fields are mandatory"],
        match:[ /^https?:\/\//, 'Invalid url']
    },
    description:{
        type: String,
        required: [true, "All fields are mandatory"],
         minLength: [10, 'description should be at least 10 characters long']
    },
    price:{
        type: Number,
        required: [true, "All fields are mandatory"],
        min: [0, 'Price shouls be a positive number']
    },
    signedUpList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }], 
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course