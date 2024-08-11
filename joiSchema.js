const joi = require("joi");

const listingSchema = joi.object({

    listing : joi.object({

        title :joi.string().required(),
        description :joi.string().required(),
        location :joi.string().required(),
        country :joi.string().required(),
        price :joi.number().required().min(0),
        image :joi.string().allow("" ,null)
    }).required()
});


const reviewSchema = joi.object({
    review :joi.object ({
        rating:joi.number().required(),
        comment:joi.string().required(),
        image:joi.string()
    }).required()
});

module.exports = listingSchema ,reviewSchema;