var express = require('express');
var bodyParser = require('body-parser');
var randomString = require("randomstring");
var fs = require('fs');
var log = require("./log");
var db = require("./db");
var app = express();

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(bodyParser.json({limit: '10mb'}));

app.get("/", function (req, res) {
    res.send("Hello World");
});
app.listen("8081", function () {
    var host = this.address().address;
    var port = this.address().port;
    log.info("Running at http://" + host + port);
});


app.post("/uploadImageToCouch", function (req, res) {
    var imageName = randomString.generate(7) + ".png";
    var data = new Buffer(req.body.imageData, 'base64');
    db.insertMultipart({foo: 'bar'}, imageName, data, 'image/png').then(function (succ) {
        res.send(succ).end();
    }, function (error) {
        res.status(500).send("Could not fetch AirFiProfile. Please try again later.").end();
    });
});