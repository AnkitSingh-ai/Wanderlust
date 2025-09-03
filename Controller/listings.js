const Listing = require("../models/listing.js");


module.exports.index = async (req,res)=>{
    let query = {};
    const selectedCategory = req.query.category || 'all';
    
    // Handle category filtering
    if (selectedCategory && selectedCategory !== 'all') {
        query.category = selectedCategory;
    }
    
    const listings = await Listing.find(query);
    res.render("listings/index.ejs" , {listings, selectedCategory});
    
}

module.exports.new = async (req,res)=>{   
    res.render("listings/new.ejs");
}

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("owner") // Populate the owner of the listing
        .populate({
            path: "reviews",
            populate: {
                path: "author", // Populate the author of each review
            },
        });
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => { 
    let url = req.file.path;
    let filename = req.file.filename;
    console.log("File URL:", url);
    console.log("File Name:", filename);
    const listing = new Listing(req.body.listing);
    listing.image = { url, filename }; // Set the image URL and filename
    listing.owner = req.user._id; // Set the owner to the logged-in user
    await listing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect(`/listings/${listing._id}`);
}
module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url; // Store the original image URL
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250"); // Normalize the URL
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const updatelisting = await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
    if (!updatelisting) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatelisting.image = { url, filename }; // Update the image URL and filename
        await updatelisting.save();
    }
    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${updatelisting._id}`);
};
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
}

