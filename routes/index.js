var express = require('express');
var router = express.Router();
var fs = require('fs');
var sys = require('sys');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/save', function (req, res, next) {
    var img = req.body.img;
    var imgData = img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(imgData, 'base64');
    fs.writeFile('image.png', buf);

    res.send({ message: 'message' });

});

module.exports = router;

//http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple