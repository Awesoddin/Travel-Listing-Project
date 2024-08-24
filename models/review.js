const mongoose = require("mongoose");
// const {schema} = require("./listing");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating :{
        type : Number
    },
    createdAt:{
        type :Date,
        default : Date.now()
    } 
})
const Review = mongoose.model("Review" ,reviewSchema)
module.exports = Review;