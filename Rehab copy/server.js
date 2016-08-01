// Dependancies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var stormpath = require('express-stormpath');

//Test DB
//mongoose.connect('mongodb://redacted'); 

//Production DB
mongoose.connect('mongodb://Redacted');


// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

//Environmental Variables
process.env['STORMPATH_API_KEY_ID'] = 'Redacted';
process.env['STORMPATH_API_KEY_SECRET'] = 'Redacted';
process.env['STORMPATH_APPLICATION_HREF'] = 'Redacted';

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Setting up StormPath
app.use(stormpath.init(app, {
application: 'https://api.stormpath.com/v1/applications/Redacted',
    secretKey: 'Redacted',
    redirectUrl: '/',
    enableForgotPassword: true,
    enableUsername: true,
    requireUsername: true,
    enableAutoLogin: true,
    expandApiKeys: true,
    expandCustomData: true,
		enableForgotPassword: true,
		sessionDuration: 1000 * 60 * 60 * 24 * 31, // Make sessions expire after 1 month
		activeDuration: 1000 * 60 * 5, // Allow session extension, 5 minutes before expiration
		cache: 'memory',
}));


// Stormpath will let you know when it's ready to start authenticating users.
/*app.on('stormpath.ready', function () {
  console.log('Stormpath Ready!');
}); */

// Routes 
app.use('/', require('./routes/api'));

//Route to Dashboard
app.get('/admin', stormpath.loginRequired, stormpath.groupsRequired(['admin']), function (req, res) {
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
    console.log('Your email address is: ' + req.user.email);
  });



// Start Server
app.listen(process.env.PORT || 3000);
console.log('server is running on port 3000');