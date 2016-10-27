var Twitter = require('twitter');
var elasticsearch = require('elasticsearch');
module.exports = function (io) {
io.on('connection', function(socket){
var t = new Twitter({
	    consumer_key: 'CVS0Qnhxs7GvPXSvGFYJVHYhw',
	    consumer_secret: 'kthNyBSfxyH98uWZ95tcnhUubNHflexSJ3M2O3Xn1PYTv0rI38',
	    access_token_key: '510259968-zCXxpaJNk3s3F0jmbAkYq4H4CXqlbIegq1bkdVro',
	    access_token_secret: 'DzkkVvl6BE7fMwmN4HwFJSM7yq4DFdkv7FkoGRTlrXIgB'
	  });
var stream = t.stream('statuses/sample');

stream.on('data', function(data) {
  var flag=false;
  var lat=null,lng=null,place_name=null;
  if(data.coordinates!=null ){
  	flag=true;
  	lat = data["coordinates"]["coordinates"][1]
    lng = data["coordinates"]["coordinates"][0]
  }
  if(data['place'] !=null){
    if(data['place']['full_name'] !=null){
        flag=true;
        place_name = data["place"]["full_name"];
    }
  }
  if(flag){


  status = data["text"];
  id=data["id_str"];
  var tweet={
  	lat:lat,
  	lng:lng,
  	place_name:place_name,
  	status:status,
  	id:id
  }
  
  		socket.emit('new_tweet',tweet);
	
  var client = new elasticsearch.Client({
		  host: 'http://search-tweetsearch-octmetcnxuimyajaftfaqyrq4i.us-west-2.es.amazonaws.com/'
		});
  client.index({
        index: "tweets",
        type: "tweet",
        body: tweet
    }).then(function (result) {
    });
}
});
 
stream.on('error', function(error) {
  console.log(error);
});  

});}