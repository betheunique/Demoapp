var express = require('express');
var router = express.Router();

var elastic = require('../elasticsearch');
var redis = require('redis');

var redisClient = redis.createClient();


/* POST message to be indexed */
router.post('/messages', function (req, res, next) {
  elastic.addMessage(req.body).then(function (result) { res.json(result) });
});

/*
 * Search all messages 
*/
router.get("/search", function (req, res, next) {
    elastic.performSearch().then(function (data) { res.send(data) });
});

/*
 * Get all messages using redis
 */

router.get('/', function (req, res, next) {
  redis.getMessage().then(function (result) { res.json(result) });
});

router.grt('/messages', function(req, res, next) {
	redisClient.smembers("messages", function(error, result){
		res.json(result)
	});
});

module.exports = router;