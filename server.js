var express = require('express');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 3000;
app.set('views', 'public');
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(morgan('common'));

app.get('/', function(req, res) { res.sendFile(__dirname + '/public/homepage.html'); });
app.get('/member', function(req, res) { res.sendFile(__dirname + '/public/member.html'); });
app.get('/categories', function(req, res) { res.sendFile(__dirname + '/public/single_category.html'); });
app.get('/profile', function(req, res) { res.sendFile(__dirname + '/public/profile_page.html'); });
app.get('/sellers', function(req, res) { res.sendFile(__dirname + '/public/sellers_profile.html'); });
app.get('/orders', function(req, res) { res.sendFile(__dirname + '/public/orders.html'); });
app.get('/post_job', function(req, res) { res.sendFile(__dirname + '/public/post_job.html'); });
app.get('/job', function(req, res) { res.sendFile(__dirname + '/public/job_page.html'); });
app.get('/conversation', function(req, res) { res.sendFile(__dirname + '/public/conversation.html'); });

app.listen(port, function() { console.log("I am listening at: " + port); });

