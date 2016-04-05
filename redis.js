var redis = require('redis');


var redisClient = redis.createClient();

function getMessage() {

    return redisClient.smembers("messages");
}

exports.getMessage = getMessage;

function addMessage() {

	return redisClient.flushall(function(err, res) {
		var arry = [ 'Hello CloudBoost','Hello Abhishek','Hi Mom' ];
		redisClient.sadd("messages", arry, function(err, res){
			console.log("done");
		});

	});
}

exports.addMessage = addMessage;