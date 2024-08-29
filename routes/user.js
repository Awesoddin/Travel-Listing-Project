const express = require("express");
const router = express.Router();
const passport = require("passport")

const User = require("../models/user");

// For Signup
router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs");
})
router.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to Wandurlust");
    res.redirect("/listings");
})


// For Login
router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
})

router.post("/login", passport.authenticate("local",{ failureRedirect:"/login", failureFlash: true }), (req, res) => {
    req.flash("success" ,"Welcome back to Wandurlust !");
    res.redirect("/listings");
})

// Logout
router.get("/logout",(req ,res ,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success" ,"Logout Successfully");
        res.redirect("/listings");
    })
})


module.exports = router;