var mongoose = require("mongoose");
var commentschema = mongoose.Schema(
{
    username : String,
    lscore1 : Number,
    lscore2 : Number,
    lscore3 : Number,
    lscore4 : Number,
    lscore  : Number,
    tscore1 : Number,
    tscore2 : Number,
    tscore3 : Number,
    tscore4 : Number,
    tscore  : Number
});
module.exports = mongoose.model("Score",commentschema);
