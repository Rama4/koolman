var express = require("express");
var router = express.Router({mergeParams : true});
var Score = require("../modules/Score");
//----------------------------------------------------------------------------------------------------------------    
var get_arrays = function(users)
{
    var l1=[],l2=[],l3=[],l4=[],l=[];
    for(var i=0;i<users.length;i++)
    {
        l1.push({score:users[i].tscore1,username:users[i].username});
        l2.push({score:users[i].tscore2,username:users[i].username});
        l3.push({score:users[i].tscore3,username:users[i].username});
        l4.push({score:users[i].tscore4,username:users[i].username});
        l.push({score:users[i].tscore,username:users[i].username});
    }
    l1.sort(function(a,b)
    {
        return a.score < b.score;
    });
    l2.sort(function(a,b)
    {
        return a.score < b.score;
    });
    l3.sort(function(a,b)
    {
        return a.score < b.score;
    }); 
    l4.sort(function(a,b)
    {
        return a.score < b.score;
    });
    l.sort(function(a,b)
    {
        return a.score < b.score;
    });
    console.log(l4);
    return {l1:l1,l2:l2,l3:l3,l4:l4,l:l};
};

var currentuser = 'tourist';
router.get('/',function(req,res)
{
	res.render('landing');
});

router.post("/login",function(req,res)
{   // find and update the correct campground
    Score.findOne({'username':req.body.username},function(err,user)
    {
      if(err){	console.log(err);	}
      else
      {
      	currentuser = req.body.username;
      	if(user)
      	{
      		
      		console.log("already there");
      		res.redirect("/1");	
      	}
      	else
    	{
    		var user = 
    		{
    			username:req.body.username,
    			lscore1:0,
    			lscore2:0,
    			lscore3:0,
    			lscore4:0,
    			lscore:0,
    			tscore:0,
    			tscore1:0,
    			tscore2:0,
    			tscore3:0,
    			tscore4:0
    		};
    		 Score.create(user,function(err,com)
            {
              if(err){	res.redirect("/");	}
              else{
              		console.log("user created!");
                     res.redirect('/1');  // redirect after saving
                }
            });
    	}
        
      }
    });
});

router.get("/quit",function(req,res)
{
	res.redirect("/");
	//currentuser = 'tourist';
	console.log("quit received");
	
});

router.post("/score1",function(req,res)
{   // find and update the correct campground
    var temp = req.body.score;
    
    console.log("receved post req");
    Score.findOne({'username':currentuser},function(err,user)
    {
      if(err){	console.log(err);	}
      else
      {
      	if(user)
      	{
      		user.lscore1 = temp;
      		user.lscore2 = 0;
      		user.lscore3 = 0;
      		user.lscore4 = 0;
      		
      		user.lscore = user.lscore1+ user.lscore2 + user.lscore3 + user.lscore4;
      		if(user.tscore < user.lscore)
      			user.tscore = user.lscore;
      		user.save();
			if( user.tscore1 < req.body.score)
			{
				user.tscore1 = req.body.score.toString();
				console.log("updated score1");
				user.save();
			}
			else
				console.log("didn't update score1");
      	}
      	else
    	{
    		console.log("error cannot find user");
    		res.redirect("/");
    	}
     }
    	
    });
});

router.post("/score2",function(req,res)
{   // find and update the correct campground
    var temp = req.body.score;
    
    console.log("receved post req");
    Score.findOne({'username':currentuser},function(err,user)
    {
      if(err){	console.log(err);	}
      else
      {
      	if(user)
      	{
      		user.lscore2 = temp;
      		user.lscore3 = 0;
      		user.lscore4 = 0;
      		
      			user.lscore = user.lscore1+ user.lscore2 + user.lscore3 + user.lscore4;
      		if(user.tscore < user.lscore)
      			user.tscore = user.lscore;
      	
      		user.save();
      		
			if( user.tscore2 < req.body.score)
			{
				user.tscore2 = req.body.score.toString();
				console.log("updated score2");
				user.save();
			}
			else
				console.log("didn't update score2");
      	}
      	else
    	{
    		console.log("error cannot find user");
    		res.redirect("/");
    	}
     }
    	
    });
});

router.post("/score3",function(req,res)
{   // find and update the correct campground
    var temp = req.body.score;
    
    console.log("receved post req score="+temp);
    Score.findOne({'username':currentuser},function(err,user)
    {
      if(err){	console.log(err);	}
      else
      {
      	if(user)
      	{
      		user.lscore3 = temp;
      		user.lscore4 = 0;
      		
      			user.lscore = user.lscore1+ user.lscore2 + user.lscore3 + user.lscore4;
      		if(user.tscore < user.lscore)
      			user.tscore = user.lscore;
      	
      		user.save();
			if( user.tscore3 < req.body.score)
			{
				user.tscore3 = req.body.score.toString();
				console.log("updated score3");
				user.save();
			}
			else
				console.log("didn't update score3");
      	}
      	else
    	{
    		console.log("error cannot find user");
    		res.redirect("/");
    	}
     }
    	
    });
});

router.post("/score4",function(req,res)
{   // find and update the correct campground
    var temp = req.body.score;
    
    console.log("receved post req score="+temp);
    Score.findOne({'username':currentuser},function(err,user)
    {
      if(err){	console.log(err);	}
      else
      {
      	if(user)
      	{
      		user.lscore4 = temp;
      			user.lscore = user.lscore1+ user.lscore2 + user.lscore3+ user.lscore4;
      		if(user.tscore < user.lscore)
      			user.tscore = user.lscore;
      	
      		user.save();
			if( user.tscore4 < req.body.score)
			{
				user.tscore4 = req.body.score.toString();
				console.log("updated score4");
				user.save();
			}
			else
				console.log("didn't update score4");
      	}
      	else
    	{
    		console.log("error cannot find user");
    		res.redirect("/");
    	}
     }
    	
    });
});
router.get('/1',function(req,res)
{
	res.render('koolman');
});
router.get('/2',function(req,res)
{
	res.render('rgb');
});
router.get('/3',function(req,res)
{
	res.render('bubbles');
});

router.get('/4',function(req,res)
{
	res.render('memory');
});


router.get('/scores',function(req, res) {
	var table;
	console.log("showing scores for:"+currentuser);
	Score.findOne({'username':currentuser},function(err,user)
    {
      if(err){	console.log(err);	}
      else
      {
      	if(user)
      	{
      		res.render('scores',{user:user}); 
      		currentuser = "tourist";
	
      	}
      	else
    	{
    		console.log("error cannot find user");
    		currentuser = "tourist";
	
    		res.redirect("/");
    	}
     }
    	
    });
});

router.get('/highscores',function(req, res) {
	var table;
	Score.find({},function(err,users)
    {
      if(err){	console.log(err);	}
      else
      {
      	if(users)
      	{
      	    var bundle= get_arrays(users);
      		res.render('highscores',{arr:bundle}); 
      	}
      	else
    	{
    		console.log("error cannot find user");
    		res.redirect("/");
    	}
     }
    });
});
router.get('/fun',function(req, res) {
   res.render('fun') ;
});
module.exports = router;