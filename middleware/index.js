var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                console.log(err);
                res.redirect("back");
            }else{
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
//if user is logged in
    if(req.isAuthenticated()){
         //if comment belongs to the user
         Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(req.user._id.equals(foundComment.author.id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
        
    }else{
       req.flash("error", "You need to be logged in to do that");
       res.redirect('/login'); 
    }
}
//Middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //flash shows on next page
    req.flash("error", "You need to be logged in to do that!");
    res.redirect('/login');
}



module.exports = middlewareObj;