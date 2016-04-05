var elasticsearch = require('elasticsearch');
//var redis = require('redis');
var Q = require('q');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

var indexName = "messages";

/**
* Delete an existing index
*/
function deleteIndex() {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function startIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.startIndex = startIndex;

/**
* check if the index exists
*/
function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists

function startMapping() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "message",
        body: {
            properties: {
                title: { type: "string" }
            }
        }
    });
}
exports.startMapping = startMapping;

function addMessage(message) {

    return elasticClient.index({
        index: indexName,
        type: "message",
        body: {
            title: message.title
        }
    });
}
exports.addMessage = addMessage;

function performSearch() {
    return elasticClient.msearch({
  body: [
    // match all query, on all indices and types
    { _index: 'randomindex', _type: 'document' },
    { query: { match_all: {} } }
  ]
    })
}
 
exports.performSearch = performSearch;