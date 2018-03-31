var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
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
                    res.redirect("back");
                }
            }
        })
        
    }else{
       res.redirect('/login'); 
    }
}
//Middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}



module.exports = middlewareObj;