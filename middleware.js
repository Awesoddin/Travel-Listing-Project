module.exports.isLoggedIn = (req ,res ,next) => {
    if(!req.isAuthenticated()){
        req.flash("error" ,"You must logged to create an listing");
        return res.redirect("/login");
    }
    next();
}