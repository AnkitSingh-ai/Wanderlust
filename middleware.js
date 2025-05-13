const Listing = require("./models/listing");
const Review = require("./models/review");
module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        console.log("Redirect URL Saved:", req.session.redirectUrl); // Debugging
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    console.log("Redirect URL in Session:", req.session.redirectUrl); // Debugging
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; // Clear the redirect URL after saving it
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");
    console.log("Listing:", listing); // Debugging
    console.log("Logged-in User:", req.user); 
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (!listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/listings/${id}`);
    }
    next();
}



module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${req.params.id}`);
    }
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
};