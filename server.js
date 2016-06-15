var express = require('express');
var app = express();
var PORT = 3000;

// create a middleware object
var middleware ={
	requireAuthentication: function(req,res,next){
		console.log('private route hit!');
		next();
	},
	logger: function (req, res, next){
		console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
		next();
	}
};
 
// global-level middleware
// the order is important, this method should be before the '/about' route
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

// '/' is the root url
// app.get('/', function (req, res) {
// 	res.send('hello express');
// });

// /about
// add route-level middleware before function(req,res)
app.get('/about', middleware.requireAuthentication, function(req, res){
	res.send('About Us!');
});

app.use(express.static(__dirname + '/public'));

//console.log(__dirname);

app.listen(PORT, function(){
	console.log('express server started on port: ' + PORT);
});