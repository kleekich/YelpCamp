var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments New
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

//Comments Create
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username=req.user.username;
            
                    //save comment
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/'+ foundCampground._id);
                }
            })
            console.log(req.body.comment);
            // Comment.create
        }
    })
})
//EDIT Comment route
router.get("/campgrounds/:id/comments/:comment_id/edit", function(req, res){
    
    //if user is logged in
    if(req.isAuthenticated()){
         //if comment belongs to the user
         Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                console.log("======found comment=====");
                console.log(foundComment);
                console.log("========================");
                
                if(req.user._id.equals(foundComment.author.id)){
                    res.render("comments/edit",{ campground_id : req.params.id,
                                             comment: foundComment
                                            });
                }else{
                    res.redirect("back");
                }
            }
        })
        
    }else{
       res.redirect('/login'); 
    }
       
    //else
    
    
    
    
})

//UPDATE Comment route
router.put("/campgrounds/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id,  req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            updatedComment.save();
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

router.delete("/campgrounds/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment){
        if(err){
            res.redirect("back");
        }else{
            
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
    
})

//router.put("/campgrounds/:id")



//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
module.exports = router;