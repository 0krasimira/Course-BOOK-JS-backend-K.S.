const Course = require("../models/Course")
const User = require('../models/User')


exports.getByIds = (ownersId) => {
    const owner = Course.find({_id: {$in: ownersId}})
    return owner
}