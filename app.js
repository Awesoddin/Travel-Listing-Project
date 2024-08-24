const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError");

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





app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



app.get("/",(req ,res)=>{
    res.send("Root");
});



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