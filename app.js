var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");
//Models
var Campground  = require("./models/campground");
var Comment = require("./models/comment");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

//Schema Setup

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){

   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.descriptioçn;
   var newCampground = {name: name, image:image, description: desc};
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       }else{
          //redirect back to campgrounds 
          res.redirect("/campgrounds"); 
       }
   })
   
   
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});
//SHOW - shows more info about selected campground
app.get("/campgrounds/:id", function(req, res){
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

//===========================
// COMMENTS ROUTES 
//==========================
app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: foundCampground});
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});