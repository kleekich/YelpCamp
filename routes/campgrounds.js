var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//INDEX - show all campgrounds
router.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

//CREATE - add new campaground to DB
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){

   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image:image, description: desc, author:author};
   
  
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       }else{
          //redirect back to campgrounds 
          req.flash("success", "Successfully created");
          res.redirect("/campgrounds"); 
       }
   })
   
   
});

//NEW - show form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//SHOW - shows more info about selected campground
router.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
        }
    })
})
//EDIT Campground Route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
           res.render("campgrounds/edit", {campground: foundCampground});
        });
    });

//UPDATE Campground Route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find amd update correct campground
    
    Campground.findByIdAndUpdate(
        req.params.id,
        { 
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description
        },
        function(err, updatedCampground){
            if(err){
                console.log("updated failed");
                res.redirect("/campgrounds");
            }else{
                req.flash("success", "Successfully edited");
                res.redirect("/campgrounds/" + req.params.id);
            }
        }
    );
});

//DESTROY Campground ROUTE

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Successfully deleted");
            res.redirect("/campgrounds");
        }
        
    })
})

module.exports = router;
