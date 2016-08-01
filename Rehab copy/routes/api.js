// Dependanceis
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var IpInfo = require("ipinfo");
var http = require("http");
var util = require( 'util' );
var sendgrid = require('sendgrid')("Redacted");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Models
var form = require('../models/form');
var partner = require('../models/partner');

//HomePage
app.get('/', function (req, res){
	var affiliateID = req.query.affiliateID; 
		console.log(affiliateID); 

  res.render('home', {
  	affiliateID: affiliateID,
  });
});

//Thank You Page
app.get('/thanks', function (req, res){
  res.render('thanks', {
  });
});

//Thank You Page with Tracking ID
app.get('/thanks/:id', function (req, res){
	var id = req.params.id; 

  res.render('thanks', {
  	id: id,
  });
});

//Receive Submission Form
app.post('/submit', function (req, res){
	var name = req.body.name;
	var phone = req.body.phone;
	var message = req.body.message;
	var affiliateID = req.body.affiliateID; 
	var campaignID = req.body.campaignID; 
	var sourceURL = 'www.rehabnexus.net';

	var ip = req.headers['x-forwarded-for'];
   			if (!ip)
   				var ip = 'Unknown';
				console.log('The client IP is  = ' + ip);

    	IpInfo(ip, function (err, cLoc) {
  			console.log(err || cLoc);
  			var country = cLoc.country;
  			var state = cLoc.region;
  			var city = cLoc.city;
  			var loc = cLoc.loc;
  			var postal = cLoc.postal;


	var newForm = new form();
		newForm.name = name;
	    //newForm.email = email; 
	    newForm.createdAt = new Date(); 
	    newForm.phone = phone;
	    newForm.message = message;
	    newForm.affiliateID = affiliateID;
	    newForm.campaignID = campaignID;
	    newForm.sourceURL = sourceURL;
	    newForm.ip = ip;
	    newForm.city = city;
	    newForm.state = state;
	    newForm.zipCode = postal;

			newForm.save(function(err){
				if (err)
					res.send(err);
			}); 
		});

    var email = new sendgrid.Email({
	    to: 'Redacted',
	    toname: 'Redacted',
	    fromname: 'Redacted',
	    from: 'Redacted',
	    subject: 'Form Submitted!',
	    html: '<h1></h1>',
	    text: '',
	    //text: 'Name = '+ ' ' + name + ' ' + 'Phone = ' + ' ' + phone + ' ' + 'message = ' + ' ' + message + ' ' + 'affiliate id = ' + ' ' + affiliateID,
    	});

    email.addFilter('templates', 'enable', 1);
    email.addFilter('templates', 'template_id', 'Redacted');
    email.addSubstitution('-name-', name);
    email.addSubstitution('-phone-', phone);
    email.addSubstitution('-message-', message);
    email.addSubstitution('-affiliateID-', affiliateID);
    email.addSubstitution('-campaignID-', campaignID);


    sendgrid.send(email, function(err, json){
       if (err) {return console.log(err);}
    });

	res.render('thanks', {
	  	affiliateID: affiliateID,
	});

});

/*http://rehabnexus.biz/post.aspx?affid=<Insert Your Affiliate Id#>&cid=<Insert Your Assigned campaign ID#>&email=mail@domain.com&fname=Jon&lname=Doe&phone1=5551212&ip=192.168.7.54&http=domain.com&rdate=2014-03-30+20%3A57%3A39 */

//Posting Docs
app.get('/post', function (req, res){
	var affiliateID = req.query.affiliateID;
	var campaignID = req.query.campaignID;
	var email = req.query.email;
	var firstName = req.query.firstName;
	var lastName = req.query.lastName;
	var phone = req.query.phone;
	var ip = req.query.ip;
	var sourceURL = req.query.sourceURL;
	var createdAt = req.query.date;
	var message = req.query.message;
	var insuranceType = req.query.insuranceType;
	//var leadDate = req.query.leadDate;


	var newPartner = new partner();
		newPartner.firstName = firstName;
		newPartner.lastName = lastName;
	    newPartner.email = email; 
	    newPartner.createdAt = createdAt;
	    newPartner.phone = phone;
	    newPartner.affiliateID = affiliateID;
	    newPartner.campaignID = campaignID;
	    newPartner.sourceURL = sourceURL;
	    newPartner.ip = ip;
	    newPartner.message = message;
	    newPartner.insuranceType = insuranceType;

			newPartner.save(function(err){
				if (err)
					res.send(err);
			}); 

	var email = new sendgrid.Email({
	    to: 'Redacted',
	    toname: 'Redacted',
	    fromname: 'Redacted',
	    from: 'Redacted',
	    subject: 'Form Submitted from API!',
	    html: '<h1></h1>',
	    text: '',
	    //text: 'firstName = '+ ' ' + firstName + ' ' + 'lastName = '+ ' ' + lastName + ' ' + 'Phone = ' + ' ' + phone + ' ' + 'affiliate id = ' + ' ' + affiliateID + ' ' + 'campaign id = ' + ' ' + campaignID + ' ' + 'source URL = ' + ' ' + sourceURL,
    	});

	email.addFilter('templates', 'enable', 1);
    email.addFilter('templates', 'template_id', 'Redacted');
    email.addSubstitution('-firstName-', firstName);
    email.addSubstitution('-lastName-', lastName);
    email.addSubstitution('-phone-', phone);
    email.addSubstitution('-message-', message);
    email.addSubstitution('-affiliateID-', affiliateID);
    email.addSubstitution('-campaignID-', campaignID);

    sendgrid.send(email, function(err, json){
       if (err) {return console.log(err);}
    });


	res.status(200).send('OK');


});

// Get Forms into dashboard

app.get('/api/forms', function (req, res){

  form.find(function(err, forms){
    if (err)
      res.send(err);
    res.send(forms);
  });

 });

// Get Partners into dashboard

app.get('/api/partners', function (req, res){

  partner.find(function(err, partners){
    if (err)
      res.send(err);
    res.send(partners);
  });
});



module.exports = app;


