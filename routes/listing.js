const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

router.get("/", async (req, res) => {
    const allListings = await Listing.find();
    res.render("./listings/index.ejs", { allListings });
});

// new rout
router.get("/new", isLoggedIn, (req, res) => {
    res.render("./listings/new.ejs");
});


// show rout
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: {path :"author",}, }).populate("owner");
    if (!Listing) {
        req.error("error", "Listing is not available which you find !");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}));

// Performing CRUD operation
// creat rout
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save()
    req.flash("success", "New listing added successfully!!");
    res.redirect("/listings");
}));

// updating in 2 steps
// Edit Rout
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById((id))
    if (!listing) {
        req.error("error", "Listing is not available which you find !");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
}));
// update Rout
router.put("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    if (!req.body.listing) {
        throw new expressError(400, "send valid data for listing");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Review Updated !")
    res.redirect(`/listings/${id}`);
}));

// delete Rout
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is deleted!!");
    res.redirect("/listings");
}));

module.exports = router;