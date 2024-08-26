const express = require("express");
const router = express.Router({ mergeParams : true });

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {reviewSchema} = require("../joiSchema.js");


const validateReview = (req ,res ,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new expressError(400 ,errMsg);
    }
    else{
        next()
    }
};

router.post("/"  ,validateReview ,wrapAsync(async (req ,res)=>{
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review (req.body.review);
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" ,"New Review created successfully !")
    res.redirect(`/listings/${listing.id}`);
}));

// Delete Review
router.delete("/:reviewId",wrapAsync(async(req ,res)=>{
    let {id ,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id ,{$pull :{reviews :reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" ,"Review is deleted !")

    res.redirect(`/listings/${id}`);
}));

module.exports = router;