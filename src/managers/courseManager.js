const Course = require('../models/Course')
const User = require("../models/User")

exports.getAll = () => Course.find()
exports.getThree = () => Course.find().sort({_id: -1}).limit(3)
exports.getOne = (courseId) => Course.findById(courseId).populate("owner"). //populate("signedUpList")

exports.create = async (userId, courseData) => {
    const createdCourse = Course.create({
        owner: userId,
        ...courseData
    })

    await User.findByIdAndUpdate(userId, {$push: {createdCourses: createdCourse._id}})
    return createdCourse
}

exports.signUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, {$push: {signedUpList: userId}})
    await User.findByIdAndUpdate(userId, {$push: {signedUpCourses: courseId}})
    //same as:
    // const course = await Course.findById(courseId)
    // const user = await User.findById(userId)
    
    // course.signedUpList.push(userId)
    // user.signedUpCourses.push(courseId)

    // await course.save()
    // await user.save()
}


////zashto ne mi izliza ownera v db?