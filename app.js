var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

//Schema Setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String 
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salmon Creek",
//         image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=800&q=60",
//         description: "This is a beautiful place for camp!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly Created Campground: ");
//             console.log(campground);
//         }
//     });



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
            res.render("index", {campgrounds: campgrounds});
        }
    })
});

//CREATE - add new campaground to DB
app.post("/campgrounds", function(req, res){

   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
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
    res.render("new");
});
//SHOW - shows more info about selected campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }
    })
    
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});