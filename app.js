const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("Views",path,path.join(__dirname, "views"));
app.set("view engin" ,"ejs");
app.use(express.static(path.join(__dirname ,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

const port = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/wandurlust"


main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
   await mongoose.connect(MONGO_URL);
}

// root 
app.get("/",(req ,res)=>{
    res.send("Root");
});


const sessionOptions ={
    secret:"SuperSecret",
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    httpOnly:true,
};


app.use(session(sessionOptions));
app.use(flash());



app.use((req ,res ,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    
    next();
})

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// // All wrong routes
app.all("*",(req ,res, next)=>{
    next(new expressError(404 ,"page not found!"));
});

app.use((err ,req ,res ,next)=>{
    let {statusCode=500 ,message="Something went wrong"}= err;
   res.status(statusCode).render("error.ejs", {message});
});

app.listen(port ,()=>{
    console.log(`Listening on port ${port}`);
});