const express = require("express");
const router = express.Router({ mergeParams : true });

const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const listingSchema = require("../joiSchema.js");



const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    }
    else {
        next()
    }
};



router.get("/", async (req, res) => {
    const allListings = await Listing.find();
    res.render("./listings/index.ejs", { allListings });
});

// new rout
router.get("/new", (req, res) => {
    res.render("./listings/new.ejs");
});


// show rout
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs", { listing });
}));

// Performing CRUD operation

// creat rout
// router.post("/", validateListing ,wrapAsync(async (req, res, next) => {
//     let result = listingSchema.validate(req.body);
//     if (result.error) {
//         throw new expressError(400, result.error);
//     }
//     const newListing = new Listing(req.body.listing);
//     await newListing.save()
//     res.redirect("http://localhost:3000/listings/");
// }));
// creat rout

router.post("/" ,validateListing ,wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save()
    res.redirect("/listings");
}));

// updating in 2 steps
// Edit Rout
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById((id))
    res.render("./listings/edit.ejs", { listing });
}));
// update Rout
router.put("/:id",  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
        throw new expressError(400, "send valid data for listing");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// delete Rout
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;