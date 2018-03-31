var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//===========================
// COMMENTS ROUTES 
//==========================
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: foundCampground});
        }
    })
})

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect('/campgrounds/'+ foundCampground._id);
                }
            })
            console.log(req.body.comment);
            // Comment.create
        }
    })
    //create new comment
    
    //connect new comment to campground
    
    //redirect to campground show page
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
module.exports = router;