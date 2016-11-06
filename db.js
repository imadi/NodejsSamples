var log = require("./log");
var nano = require('nano')('http://localhost:5984');
var randomString = require("randomstring");
var Q = require('q');

var db = {
    insertMultipart: function (doc, imageName, data, contentType) {
        var def = Q.defer();
        nano.use('test').multipart.insert(doc, [{
            name: imageName,
            data: data,
            content_type: contentType
        }], randomString.generate(), function (err, data) {
            if (!err) {
                def.resolve(data)
            }
            else {
                log.error("Error : " + err);
                def.reject(err);
            }
        });
        return def.promise
    },
    insertBulkDocs: function (docs) {
        var def = Q.defer();
        nano.use("test").bulk(docs, function (err, data) {
            if (!err) {
                def.resolve(data);
            }
            else {
                log.error(err);
                def.reject(err);
            }
        });
        return def.promise
    }
};

module.exports = db;