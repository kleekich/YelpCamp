var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

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
router.post("/campgrounds", isLoggedIn, function(req, res){

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
          console.log("**********");
          console.log(newlyCreated)
          console.log("**********");
          res.redirect("/campgrounds"); 
       }
   })
   
   
});

//NEW - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//SHOW - shows more info about selected campground
router.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log("=======");
            console.log(foundCampground);
            console.log("=======");
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})
//EDIT Campground Route
router.get("/campgrounds/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
    
})

//UPDATE Campground Route
router.put("/campgrounds/:id", function(req, res){
    //find amd update correct campground
    
    Campground.findByIdAndUpdate(
        req.params.id,
        { 
            name: req.body.name,
            image: req.body.image,
            description: req.body.description
        },
        function(err, updatedCampground){
            if(err){
                console.log("updated failed");
                res.redirect("/campgrounds");
            }else{
                res.redirect("/campgrounds/" + req.params.id);
            }
        }
    );
});

//DESTROY Campground ROUTE

router.delete("/campgrounds/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
        
    })
})

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
