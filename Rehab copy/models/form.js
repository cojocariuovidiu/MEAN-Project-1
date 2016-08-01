//Dependancies

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema
var formSchema = new mongoose.Schema({
	email: String,
	name: String,
	phone: String,
	affiliateID: String,
	campaignID: String,
	ip: String,
	sourceURL: String,
	//firstName: String,
	//lastName: String,
	createdAt: Date,
	city: String,
	state: String,
	zipCode: String,
	message: String,


});


module.exports = mongoose.model('form', formSchema);
