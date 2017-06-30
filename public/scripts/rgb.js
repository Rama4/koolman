var colors      =  [];  
var no_of_colors= 6;
var squares     =  document.querySelectorAll(".square"); 
var rgbcolor    =  document.querySelector("#rgb"); 
var res         =  document.querySelector("#result"); 
var reset       =  document.querySelector("#reset");
var msg         =  document.getElementById("message");
var required_color;
var score=10000;

$('#msg').hide();
$('#score').hide();

var resetcolors=function()
    {
        msg.textContent="New Colors";
        res.textContent="";
        $('#msg').hide();
        document.querySelector("h1").style.background="steelblue";
        
        colors=generatecolors(no_of_colors);
        for(var i=0;i<6;i++)
        {
            if(colors[i])
            {
                squares[i].style.display="block";
                squares[i].style.background=colors[i];
            }
            else
            {    squares[i].style.display="none";}
        }
        required_color  =    colors[rand(no_of_colors)];
        rgbcolor.textContent = required_color;
    };
var  setup =function()
    {
        resetcolors();
        for(var i=0;i<squares.length;i++)
        {
             squares[i].addEventListener("click",function()
             {
                 var selected_color=this.style.background;
                 $('#score').show();
            
                 if(selected_color ===  required_color)
                 {    
                     
                     res.textContent="Correct!";
                     changecolor(selected_color); 
                     document.querySelector("h1").style.background=selected_color;
                     msg.textContent="Play Again";
                     $('#msg').show();
                     $('#score').html('Score: '+score);
                     $.post( "/score2", { score:score} );
                 }
                 else
                 {  
                     this.style.background="#232323"; 
                     res.textContent="Try Again!";
                     score/=2;
                     $('#score').html('Score: '+score);
                     
                 }
              
             });
        } 
        reset.addEventListener("click",resetcolors);
    };
    
   
var  changecolor=function(col)
    {
        for(var i=0;i<no_of_colors;i++)
         {    squares[i].style.background=col; }
    }; 
                
var rand=function(N)  //  random number fromm 0 to n-1
    {
        return Math.floor(Math.random() * N );
    };
                
 var   generatecolors=function(num)
    {
        var arr=[];
        for(var i=0;i<num;i++)
        {
            arr.push("rgb("+rand(256)+", "+rand(256)+", "+rand(256)+")");
        }
        return arr;
    };
/*---------------------------------------------------*/


    setup();
    
    
