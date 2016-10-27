var express = require('express');
var Twitter = require('twitter');
var elasticsearch = require('elasticsearch');
var app= express();
var router = express.Router();
//app.use( express.static(__dirname + '/public'));
/* GET home page. */
router.get('/', function(req, res) {
	
		var client = new elasticsearch.Client({
		  host: 'http://search-tweetsearch-octmetcnxuimyajaftfaqyrq4i.us-west-2.es.amazonaws.com/'
		});
		client.search({
		  	index: 'tweets',
		  	q: '*:*',
		  	size:50
		}).then(function (body) {
			tweets=body;
		  	res.render('index',{tweets:body});
		}, function (error) {
		  	console.trace(error.message);
		});
		
});

router.get('/key', function(req, res) {
	var client = new elasticsearch.Client({
		  host: 'http://search-tweetsearch-octmetcnxuimyajaftfaqyrq4i.us-west-2.es.amazonaws.com/'
		});
	var key=req.param('key');
		if(key=='All'){
			
		  	client.search({
		  	index: 'tweets',
		  	q: '*:*',
		  	size:50
		}).then(function (body) {
			tweets=body;
		  	res.send({tweets:body});
		}, function (error) {
		  	console.trace(error.message);
		});

		}
		else{
			client.search({
		  	index: 'tweets',
		  	q: key
		}).then(function (body) {
			tweets=body;
		  	res.send({tweets:body});
		}, function (error) {
		  	console.trace(error.message);
		});

		}
		

	
});
module.exports = router;
