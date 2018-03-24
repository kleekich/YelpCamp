var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.user(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=800&q=60"},
        {name: "Kvalvika Beach", image: "https://images.unsplash.com/photo-1502993100359-6e0cee23764d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e19bf1af6566cfc50a97dc28fd54af55&auto=format&fit=crop&w=800&q=60"},
        {name: "West Rim Trail", image: "https://images.unsplash.com/photo-1501724326152-7a82bf5eae72?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5fe4dcf894fbb997b29a76c6c9a9c32c&auto=format&fit=crop&w=800&q=60"}
    ]
    
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    res.send("You Hit the post route!");
   //get data from form and add to campgrounds array
   //redirect back to campgroudns 
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
})