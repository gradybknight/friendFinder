// Load Data
var accumulatedResults = require("../data/friends.js");

// routing

module.exports = function(app) {
    app.get("/api/tables",function(req,res){
        res.json(accumulatedResults);
    });
    app.post("/api/survey/submit",function(req,res){
        console.log(req.body);
        var closestMatch = findClosestMatch(req.body);
        console.log(closestMatch);
        accumulatedResults.push(req.body);
        res.json(closestMatch);
    });
}

function findClosestMatch(surveyEntry){
    var overallMinimumGap = 40; // max gap per question * 10 questions
    var indexOfClosestMatch = 0;
    for (var i=0; i<accumulatedResults.length; i++){
        var currentGap = 0
        for (var j= 0; j<10; j++){
            currentGap += Math.abs(surveyEntry.scores[j] - accumulatedResults[i].scores[j]);
        }
        if (currentGap < overallMinimumGap) {
            indexOfClosestMatch = i;
            overallMinimumGap = currentGap;
        }
    }
    return accumulatedResults[indexOfClosestMatch];
}
