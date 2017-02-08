var express = require('express');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', 'public');
app.use(express.static('public'));
app.use(morgan('common'));

app.get('/', function(req, res) { res.render('homepage'); });

app.listen(port, function() { console.log("I am listening at: " + port); });

