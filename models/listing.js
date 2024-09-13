const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

let listingSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        // default:"https://media.istockphoto.com/id/1284671318/photo/meadows-in-the-snow-peak-mountains-of-himalaya.jpg?s=2048x2048&w=is&k=20&c=zIibFUP3rnibsoKPWtD4y7ChHDaKfbsVNmQtd6ci9R0=",
        type:String
        // set: (v)=> v ===""?"https://media.istockphoto.com/id/1284671318/photo/meadows-in-the-snow-peak-mountains-of-himalaya.jpg?s=2048x2048&w=is&k=20&c=zIibFUP3rnibsoKPWtD4y7ChHDaKfbsVNmQtd6ci9R0="
        // :v, 
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    // One to many relationship with reviews listing and reviews
    reviews :[
        {
            type : Schema.Types.ObjectId,
            ref :"Review"
    }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}) ;

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
        
    }
});

const Listing = mongoose.model("Listing" ,listingSchema);
module.exports = Listing;