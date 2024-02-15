const router = require("express").Router()
const courseManager = require("../managers/courseManager")

    
router.get("/", async(req, res) => {
    const courses = await courseManager.getThree().lean()
    res.render("home", {courses})
})

router.get('/404', (req, res) => {
    res.render('404')
})




module.exports = router