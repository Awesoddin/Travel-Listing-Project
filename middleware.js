module.exports.isLoggedIn = (req ,res ,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" ,"You must logged to create an listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req ,res ,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}