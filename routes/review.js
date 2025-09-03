const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router( {mergeParams: true });
const ExpressError = require("../utils/Expresserror");
const {reviewSchema} = require('../schema.js');
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require('../Controller/reviews.js');
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else {
        next();
    }
}

// Create Review
router.post('/', isLoggedIn, validateReview, reviewController.createReview);

// Delete Review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;

