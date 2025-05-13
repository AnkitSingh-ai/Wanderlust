const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    const listing = await Listing.findById(id);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash('success', 'Successfully added a review!');
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted the review!');
    res.redirect(`/listings/${id}`);
};