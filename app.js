var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine' , 'handlebars');
app.use(express.static('public'));

app.get('/', function(req,res){
    var queryString = encodeURIComponent(req.query.term);
    //Using giphy-api module
    giphy.search(queryString, function (err,response) {
        res.render('home', {gifs: response.data})
    });

    /* "Rolling your own" http method
    var term = encodeURIComponent(queryString);
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

    http.get(url, function(response){
        response.setEncoding('utf8');
        var body = '';

        response.on('data', function(d){
            body += d;
        });

        response.on('end', function(){
            // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
            var parsed = JSON.parse(body);
            // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
            res.render('home', {gifs: parsed.data})
        });
    });
    */
})

app.get('/hello-gif' , function(req,res){
    var gifUrl = 'https://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
    res.render('hello-gif' , {gifUrl : gifUrl});
});

app.get('/greetings/:name' , function(req,res){
    var name = req.params.name;
    res.render('greetings', {name : name});
});

app.listen(3000, function(){
    console.log("Listening on Port 3000");
});
