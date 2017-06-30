//NPM package modules
//==========================
var exp = require("express"),
    app = exp(),
    mongoose = require("mongoose"),
    request = require("request"),
    bp = require("body-parser"),
    methodoverride = require("method-override");
    
//============================================================

//models
//============================================================

    var Score = require("./modules/Score");
//============================================================

//exported Routes
var indexroutes = require("./routes/index");
//============================================================

//Add mongoose and connect our DB
// environment variable for database url (safety purpose : to prevent users from deleting others' data )
var url = 'mongodb://localhost/kool';
mongoose.connect(url);

//Express Settings
//============================================================
//Parses data input inside the body
app.use(bp.urlencoded({extended:true}));

//serve contents of the home page
app.set("view engine","ejs");
app.use(exp.static(__dirname + '/public'));
app.use(methodoverride("_method"));   // new
//============================================================
function create_tourist()
{
    Score.findOne({username:"tourist"},function(err,t)
    {
        if(err)console.log(err);
        else if(!t)
        {
            console.log("creating user :tourist");
            var d = {username:"tourist",lscore:0,tscore:0};
            for(var i=1;i<=4;i++)
                {d["lscore"+i]=0;d["tscore"+i]=0;}
            Score.create(d,function(err,tt)
            {
                console.log("done:"+JSON.stringify(tt,null,1));
            });
        }
        else    
            console.log('tourist already exists, no need to create user');
    });
}

//Middleware Settings
//============================================================
//  global variables
app.use(function(req , res , next)
{
//  res.locals.successArr = req.flash("successArr");
  next(); // very inportant!
});
//============================================================

//Use imports from routes folder
//============================================================
//with this we don't need to append /campgrounds into following paths i.e /campgrounds/new or /campgrounds/:id
app.use("/",indexroutes);

//============================================================



app.listen(4000,"127.0.0.1",function()
{
    console.log("sever started!");
    create_tourist();
});
module.exports = app;
