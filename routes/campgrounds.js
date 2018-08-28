var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");
//INDEX route -- show all campgrounds

router.get("/", function (req, res) {
    //Get all campgrounds from DB
    Campground.find({},
        function (err, allCampgrounds) {
            if (err) {

                console.log(err);

            } else {
                res.render("campgrounds/index", {
                    campgrounds: allCampgrounds
                });
            }
        });
});

//CREATE route -- add new campground to DB

router.post("/", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: description
    };
    //Create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW route --show form to create new campground

router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

//SHOW route -- shows more info about one campground

router.get("/:id", function (req, res) {

    //find the campground with provided id from mongodb which is present in req.params.id

    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show the template with that campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;