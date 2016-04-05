var express = require('express');
var router = express.Router();

var elastic = require('../elasticsearch');

/* POST message to be indexed */
router.post('/message', function (req, res, next) {
  elastic.addMessage(req.body).then(function (result) { res.json(result) });
});

/*
 * GET message 
*/
router.get("/search", function (req, res, next) {
    elastic.performSearch().then(function (data) { res.send(data) });
});

module.exports = router;