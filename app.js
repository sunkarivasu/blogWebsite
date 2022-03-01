const express = require("express")

const bodyParser = require("body-parser");

const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

// console.log(process.env.USER_ID,process.env.PASSWORD);

PORT = process.env.PORT||3000;

const ActivitySchema = new mongoose.Schema(
    {
        title:String,
        description:String
    }
)

const Activity = mongoose.model("Activity",ActivitySchema);


mongoose.connect("mongodb+srv://admin-vasu:vasu%40143@cluster0.ypfh3.mongodb.net/BlogDB",function(err)
{
    if(!err)
        console.log("connected to database");
    else
        console.log("Error occured while connecting to database : "+err);
});

app.get("/",function(req,res)
{
    Activity.find({},function(err,result)
    {
        if(!err)
        {
            var activityList=result;
            console.log(activityList);
            res.render("index",{activities:activityList});
        }
            
        else
            console.log("error occured while fetching the data");
    
    });
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
    res.render("readMore",{postTitle:activityList[post_id].title,postDesc:activityList[post_id].post});
});

app.post("/compose",function(req,res)
{
    //console.log(req.body)
    var titleName = req.body.title;
    var postDesc = req.body.post;
    var Event = new Activity(
        {
            title:titleName,
            description:postDesc
        }
    );
    Event.save(function(err)
    {
        if(!err)
        {
            res.redirect("/"); 
        }
        else
        {
            console.log("Error occured while inserting record");
        }
    })
    
})


app.listen(PORT,function()
{
    console.log(`server is up and running on ${PORT}`);
})