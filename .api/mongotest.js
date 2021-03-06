var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

function getDb() {
    MongoClient.connect('mongodb://127.0.0.1:27017/meteor', function(err, db) {
        if(err) throw err;
        var collection = db.collection('environments');
        console.log('returning collection');
        return collection;
        /*
        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
            console.dir(results);
            // Let's close the db
            db.close();
        });
        */
    });
}


function respond(req, res, next) {
    res.send('hello ' + req.params.id);
}

function setStatus(req, res, next) {
    console.log('1');
    var id = req.params.id;
    var statusText = req.params.statusText;
    console.log('2');
    console.log('3');
    /*if(Collection == null) {
        console.log('collection is null');
    }*/
    var env = Collection.findOne({ _id: new ObjectId(id) }, console.log);
    console.log('4');
    env.Status = statusText;
}

var server = restify.createServer();
server.get('/api/status/:id/:status', setStatus);


server.listen(8088, function() {
    Collection = getDb();
    console.log('listening');
});

var Collection = null;

