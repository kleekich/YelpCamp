var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=800&q=60",
        description: "Best campground ever"
    },
    {
        name: "Fire's Campground",
        image: "https://images.unsplash.com/photo-1502814828814-f57efb0dc974?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b85b41ac63fecc3ef432c48f0aaea1fa&auto=format&fit=crop&w=800&q=60",
        description: "Smores night"
    },
    {
        name: "Austrailian Camp",
        image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cfe9dd8ec2366865f02eabd3a8c91d3f&auto=format&fit=crop&w=800&q=60",
        description: "How I enjoy my nightlife"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed campgrounds!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a campground");
                        Comment.create(
                            {
                                text: "This place is awesome!",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Create a new comment!");
                                }
                            })
                    }
                })
            }); 
        }
    });
    
    
    
    //add a few campgrounds
    
}


module.exports = seedDB;