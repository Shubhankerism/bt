var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/pass')(passport);
var Donor= require('../models/donor');
var Hospital= require('../models/hospitals');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/donor', function(req, res, next) {
  Donor.find(function(err,docs){
  	if (err)
		res.send(err);
	else
		res.json(docs);
	});
});

router.get('/api/getdonor/:name/:email', function(req, res, next) {
  	Donor.findOne({ 
  	name: req.params.name,
  	email: req.params.email },
  	function(err,docs){
  	if (err)
		res.send(err);
	else
		res.json(docs);
	});
});

router.get('/api/deletedonor/:name/:email', function(req, res) {
Donor.deleteOne({ 
  	name: req.params.name,
  	email: req.params.email },
  	function(err,docs){
  	if (err)
		res.send(err);
	else
		res.send(200);
	});
});
router.post('/api/adddonor', function(req, res, next) {
  Donor.create({
  	email: req.body.email,
  	name: req.body.name,
  	address: req.body.address,
  	contact: req.body.contact,
  	city: req.body.city,
  	organ: req.body.organ,
  	bloodgroup: req.body.bloodgroup,
  },function(err,docs){
  	if (err)
		res.send(err);
	else
	res.json(docs);
	});
});

router.post('/login', function(req, res, next){
console.log('calling passport)');
  passport.authenticate('local-login', function(err, user){
    if(err){ return next(err); }
req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
       });
  })(req, res, next);
});

    // handle logout
    router.post("/logout", function(req, res) {
      req.logOut();
      res.send(200);
    })

    // loggedin
    router.get("/loggedin", function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });

router.get('/api/hospital/:city', function(req, res, next) {
  Hospital.find({
  	city: req.params.city},
  	function(err,docs){
  	if (err)
		res.send(err);
	else
		res.json(docs);
	});
});

router.get('/api/hospitalbykey/:publickey', function(req, res, next) {
  Hospital.find({
  	hospitalpublickey: req.params.publickey},
  	function(err,docs){
  	if (err)
		res.send(err);
	else
		res.json(docs);
	});
});

module.exports = router;
