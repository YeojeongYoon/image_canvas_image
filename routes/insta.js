var express = require('express');
var router = express.Router();
var ig = require('instagram-node').instagram();
ig.use({ access_token: '3c2ae7ffd00f4b1cb94159a58f0abbda' });
ig.use({
    client_id: 'd47e10d483284f4b80cee11a8082222e',
    client_secret: '7a58024d20674e84b2bd5b4837455d83'
});

var redirect_uri = 'http://52.79.160.130:3000/insta' + '/handleauth';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('insta.html');
});

router.get('/authorize_user', function (req, res, next) { //http://52.79.160.130:3000/insta/authorize_user
    res.redirect(
        ig.get_authorization_url(redirect_uri, {
            scope: ['likes', 'relationship'],
            state: 'a state'
        })
    );
});

router.get('/handleauth', function (req, res, next) { //http://52.79.160.130:3000/insta/handleauth
    ig.authorize_user(req.query.code, redirect_uri, function (err, result) {
        if (err)
            console.log('err: ' + err.body);
        else
            console.log('result: ' + result.access_token);

        res.send('complete.');
    });
});

router.get('/likes', function (req, res, next) { //http://52.79.160.130:3000/insta/likes
    //api.use({ access_token: '20d3c9b782084475a9d72a2e6bb094d2' });
    ig.likes('BW9j0YRFzYJ', function (err, result, remaining, limit) {
        if (err) res.send(err);
        else res.send(result);
    });
});

router.get('/follows', function (req, res, next) { //http://52.79.160.130:3000/insta/likes
    //api.use({ access_token: '20d3c9b782084475a9d72a2e6bb094d2' });
    ig.user_follows('acuvuekr', function (err, users, pagination, remaining, limit) {
        if (err) res.send(err.body);
        else res.send(users);
    });
});

module.exports = router;

//canvas > GET /insta/handleauth?code=a27a104040544aee87b9ec3fc55e6cef&state=a+state 200 880.090 ms - 9