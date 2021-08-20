const developerNameDefault = "Michael B. Alao";
const developerCountryDefault = "Nigeria";
const time = new Date();

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// create handlebars with default layout
const handlebars = require('express-handlebars')
.create({ defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine );
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res,next){
    res.render('home', {
        layout: 'main',
        developerName: developerNameDefault,
        countryName: developerCountryDefault
    });
});

app.get('/contact', function(req,res,next){
    res.render('contact', {
        layout: 'main',
        developerName: developerNameDefault,
        countryName: developerCountryDefault
    });
});

// handling post from the form

app.post('/contact', function(req,res,next){
    // Print all request to console
    console.log(req.body);
    res.render('thankyou',  {
        layout: 'main',
        name: req.body.first_name,
        time: time
    } );
});


// Declaring handle for all error http here (after getting /post /put action ...etc)
// 404 not found
app.use(function(req,res) {
    res.status(404);
    res.render('404');
});

// 500 not found
app.use(function(err,req,res,next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

const port = process.env.PORT || 3600;

app.listen(port, () => `Server running on port ${port} 🔥`);