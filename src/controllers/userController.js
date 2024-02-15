const authRouter = require("express").Router()
const userManager = require("../managers/userManager")
const {getErrorMessage} = require('../utils/errorUtils')
const {isAuth, isGuest} = require("../middlewares/authMiddleware")

 
authRouter.get("/register", isGuest, (req, res) => {
    res.render('auth/register')
})

authRouter.post("/register", isGuest, async (req, res) => {
    const userData = req.body
    try {
        await userManager.register(userData)
        res.redirect("/auth/login")
    } catch (error) {
        res.render('auth/register', { ...userData, error: getErrorMessage(error)})
    }
    
})

authRouter.get("/login", isGuest, async (req, res) => {
    res.render("auth/login")
})

authRouter.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;
    try{
        const token = await userManager.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');
    }catch(error){
        const message = getErrorMessage(error)
        res.status(404).render('auth/login', {email, error: message})
    }
    
});

authRouter.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth')
    res.redirect('/')
})

module.exports = authRouter