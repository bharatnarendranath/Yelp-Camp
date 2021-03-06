var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//Campgroundd authorization middleware 
function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                //does the user own the camground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

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

router.post("/", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
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

router.get("/new", isLoggedIn, function (req, res) {
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


//Update Campground route

router.put("/:id", function (req, res) {
    //find and update the correct campground

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Edit campground route 
router.get("/:id/edit", checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {
            campground: foundCampground
        });
    });
});



//Destroy Campground route 
router.delete("/:id", checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;