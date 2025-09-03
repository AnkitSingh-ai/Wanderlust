const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require("../utils/Expresserror.js")
const {listingSchema} = require('../schema.js');
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require('../middleware.js');
const listingController = require('../Controller/listings.js');
const multer  = require('multer')
const {storage } = require('../cloudconfig.js');
const upload = multer({storage})


const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else {
        next();
    }
}

//Index Route
router.route("/")
.get(wrapAsync(listingController.index))
//.post(validateListing, isLoggedIn, wrapAsync(listingController.createListing))
.post(isLoggedIn, upload.single('listing[image]'),  wrapAsync(listingController.createListing));
//New Route
router.get("/new",isLoggedIn,wrapAsync(listingController.new));

//Show Route
router.route("/:id")
.get(wrapAsync(listingController.show))
//Create Route
.put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));







module.exports = router;