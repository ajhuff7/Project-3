var db = require("../models");
var passport = require("../config/passport");


module.exports = function(app) {

app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    });
app.post("/api/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function() {
        res.redirect(307, "/api/login");
        })
        .catch(function(err) {
        res.status(401).json(err);
        });
    });
app.post("/api/user/quiz", function(req, res){
    db.Quiz.create({
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description
        
    }).then(function(results){
        res.json(results)
    })
}); 
app.post("/api/user/question", function(req, res){
    db.Question.create({
        title: req.body.title,
        text: req.body.questiontext,
        description: req.body.description,
        quizId: req.quiz.id, 
        
    }).then(function(results){
        res.json(results)
    })
}); 

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
    });


}