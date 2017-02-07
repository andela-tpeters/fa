var express = require('express');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 3000;
app.set('views', 'build/views');
app.set('view engine', 'ejs');
app.use(express.static('build'));
app.use(morgan('common'));



app.get('/', function(req, res) {
	res.render('index');
});

app.get('/masonry', function(req, res) {
	res.render('masonry');
});

app.listen(port, function() {
	console.log("I am listening");
})

