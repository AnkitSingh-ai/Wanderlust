if(!process.env.NODE_ENV || process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require ("path");
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const pagesRouter = require("./routes/pages.js");
const localStrategy = require("passport-local");



app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended:true}));

// mongoose.connect("mongodb://
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sessionoptions = {
    secret: "thisshouldbeasecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    console.log("Current User:", req.user);
    next();
});


// app.get("/demouser", async (req,res)=>{
//     let fakeuser = new User({ 
//         username: "Guddan",
//        email : "abc@example.com"
//     });
//  let registereduser = await User.register(fakeuser,"password");
//     res.send(registereduser);
// });


// app.get("/" ,(req,res)=>{
//     res.send("hi , I am root");
// });

app.use("/listings",listings);
app.use("/listings/:id/review",reviews);
app.use("/",userRouter);
app.use("/",pagesRouter);


// app.all("*",(req,res,next)=>{
//       next(new ExpressError(404,"Page not found"))
//   });

app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "something Went wrong!"} = err;
    // res.render("error.ejs");
     res.status(statusCode).send(message);
})

app.listen(8080,()=>{
  console.log("server is listening to port 8080");
});


