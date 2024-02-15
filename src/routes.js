const router = require("express").Router()
const homeController = require('./controllers/homeController')
const courseController = require('./controllers/courseController')
const userController = require("./controllers/userController")


router.use(homeController)
router.use(courseController)
router.use('/auth', userController)

router.all("*", (req, res) => {
    res.render("404")
})

module.exports = router