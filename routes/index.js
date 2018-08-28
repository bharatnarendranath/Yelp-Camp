var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Campground = require("../models/campground"),
    User = require("..//models/user");

//Root Route
router.get("/", function (req, res) {
    res.render("landing");
});

//AUTH Routes

//Register form
router.get("/register", function (req, res) {
    res.render("register");
});

//Sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

//Login form
router.get("/login", function (req, res) {
    res.render("login");
});
//Login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {});
//Logout logic
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});
//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;