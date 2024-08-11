const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { appendFile } = require("fs");
const MONGO_URL = "mongodb://127.0.0.1:27017/wandurlust"



main()
 .then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
   await mongoose.connect(MONGO_URL);
}

const initDb = async ()=>{
    await Listing.insertMany(initData.data);
    console.log("Successsfull");
}

initDb();