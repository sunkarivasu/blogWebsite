const express = require("express")

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));


var activityList = [];



app.get("/",function(req,res)
{
    res.render("index",{activities:activityList});
});

app.get("/about",function(req,res)
{
    res.render("about",{});
});

app.get("/contact",function(req,res)
{
    res.render("contact",{});
});

app.get("/compose",function(req,res)
{
    res.render("compose",{});
});

app.post("/readMore",function(req,res)
{
    var post_id = req.body.post_id;
    console.log(req.body);
    res.render("readMore",{postTitle:activityList[post_id].title,postDesc:activityList[post_id].post});
});

app.post("/compose",function(req,res)
{
    //console.log(req.body)
    var title = req.body.title;
    var post = req.body.post;
    activityList.push({"title":title,"post":post});
    res.redirect("/");
})


app.listen("3000",function()
{
    console.log("server is up and running");
})