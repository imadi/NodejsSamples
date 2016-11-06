var log = require("./log");
var nano = require('nano')('http://localhost:5984');
var randomString = require("randomstring");
var Q = require('q');

var db = {
    insertMultipart: function (json, imageName, data, contentType) {
        var def = Q.defer();
        var doc = nano.use('test');
        var response = "est"
        doc.multipart.insert(json, [{
            name: imageName,
            data: data,
            content_type: contentType
        }], randomString.generate(), function (err, body) {
            if (!err) {
                def.resolve(body)
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