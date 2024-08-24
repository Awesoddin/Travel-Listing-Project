const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.string().required().min(0),
    image: Joi.string().allow("", null),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required(), 
  }).required(),
});

module.exports = listingSchema;
module.exports = reviewSchema;

// const reviewSchema = joi.object({
//     review: joi.object ({
//         rating: joi.number().required(),
//         comment: joi.string().required(),
//         image:joi.string()
//     }).required()
// });

