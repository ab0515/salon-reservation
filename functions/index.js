const functions = require('firebase-functions');
const app = require('express')();

const {
	getAllBookings
} = require('./APIs/bookings');

const {
	loginUser,
	signUpUser
} = require('./APIs/users');

app.get('/bookings', getAllBookings);
app.post('/login', loginUser);
app.post('/signup', signUpUser);

exports.api = functions.https.onRequest(app);