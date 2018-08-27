var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [{
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1533518509997-eddedc7f704e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9c1bd6b53f7d7995cce0974d8366262&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    },
    {
        name: "Mountain valley",
        image: "https://images.unsplash.com/photo-1527707240828-f7ca7d3c46a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a7c6d927c900d0de631511b52ce1687&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    },
    {
        name: "Spring spirit",
        image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    },
    {
        name: "Moonrise Camp",
        image: "https://images.unsplash.com/photo-1520963959303-a5cc3bdf9260?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9eff199a81642cb1273c8ea97b31340e&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    }
]


function seedDB() {

    // Remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed campgrounds");
        //add few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added campground");
                    // create comments
                    Comment.create({
                        text: "This place is great",
                        author: "Sam"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }

                    });
                }
            });

        });
    });

}
module.exports = seedDB;