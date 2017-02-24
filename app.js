var restify = require('restify');
var mongojs = require("mongojs");
var request = require('request');

var ip_addr = '127.0.0.1';
var port    =  '8094';
var firebase_url = "https://vodapp-6f398.firebaseio.com";
var client = restify.createJsonClient({
    url: firebase_url
});


function getHistory(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log(req.params.userId);
    var userId = req.params.userId;
    client.get('/'+userId+'.json', function(err, req, resp, obj) {
        console.log('%j', obj);
        console.log('%j', resp);
        res.send(200 , obj);
        //assert.ifError(err);
        console.log('%j', obj);
    });
    /*request(firebase_url + userId+'.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            res.send(200 , body);
        }
    }) */
}
function postNewHistory(req, res, next) {
    var viewed = {};
    viewed.title = req.params.title;
    viewed.video_url = req.params.video_url;
    viewed.poster_url = req.params.poster_url;
    viewed.id = req.params.userId;
    var userId = req.params.userId;
    res.setHeader('Access-Control-Allow-Origin','*');
    client.post('/'+userId+'.json', viewed, function(err, req, resp, obj) {
        res.send(201 , obj);
        assert.ifError(err);
        console.log('%d -> %j', resp.statusCode, resp.headers);
        console.log('%j', obj);
    });
}

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var connection_string = '127.0.0.1:27017/myapp';
var db = mongojs(connection_string, ['myapp']);
var viewed = db.collection("viewed");

var PATH = '/history'
server.get({path : PATH +'/:userId', version : '0.0.1'} , getHistory);
server.post({path : PATH , version: '0.0.1'} ,postNewHistory);

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});