const router = require('express').Router()

const courseManager = require('../managers/courseManager')
const {getErrorMessage} = require('../utils/errorUtils')
const {isAuth} = require("../middlewares/authMiddleware")
const {isGuest} = require('../middlewares/authMiddleware')

router.get('/create', isAuth, (req, res) => {
    res.render('create')
})

router.post('/create', isAuth, async(req, res) => {
    const newCourse = req.body
    console.log(req.body)

    try{
        await courseManager.create(req.user._id, newCourse);
    
        res.redirect('/all-courses')
       }catch(err){
        const message = getErrorMessage(err)
        res.status(400).render("create", {...newCourse, error: message})
       }
    })


 router.get('/courses/:courseId/details', async(req, res) => {

    const courseId = req.params.courseId
    try{
        const course = await courseManager.getOne(courseId).lean()
        console.log(course)
        // const isOwner = course.owner && course.owner == req.user?._id//movie.owner(object) ==  req.user._id(string) (convirts them to the same type)
        // const casts = await castManager.getByIds(movie.casts).lean() //--- only if populate is not used(populates the cast info into the movie with the ref: Cast in the Movie Schema)
        res.render('course/details', {...course})
} catch(error){
    console.log(error.message)
}

})

router.get('/all-courses', async (req, res) => {
    const courses = await courseManager.getAll().lean()
    res.render('catalog', {courses})
})

router.get('/courses/:courseId/sign-up', async (req, res) => {
    try{
        await courseManager.signUp(req.params.courseId, req.user._id)
        res.redirect(`/courses/${req.params.courseId}/details`)
    }catch(error){
        res.status(404).redirect('404')
    }
    
})


module.exports = router
