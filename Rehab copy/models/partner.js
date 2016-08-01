
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema
var partnerSchema = new mongoose.Schema({
	email: String,
	//name: String,
	phone: String,
	affiliateID: String,
	campaignID: String,
	ip: String,
	sourceURL: String,
	firstName: String,
	lastName: String,
	createdAt: String,
	//leadDate: String,
	city: String,
	state: String,
	zipCode: String,
	message: String,
	insuranceType: String,


});


module.exports = mongoose.model('partner', partnerSchema);
