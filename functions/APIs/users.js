const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');

exports.loginUser = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password
	};

	const { valid, errors } = validateLoginData(user);
	if (!valid) return res.status(400).json(errors);

	firebase 
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => {
			return data.user.getIdToken();
		})
		.then(token => {
			return res.json({ token });
		})
		.catch(err => {
			console.error(err);
			return res.status(403).json({ general: 'Wrong credentials, please try again' });
		});
};

exports.signUpUser = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phoneNumber: req.body.phoneNumber,
		username: req.body.username
	};

	const { valid, errors } = validateSignUpData(newUser);

	if (!valid) return res.status(400).json(errors);

	let token, userId;

	db 
		.doc(`/users/${newUser.username}`)
		.get()
		.then(doc => {
			if (doc.exists) {
				return res.status(400).json({ username: 'This username is already taken' });
			} else {
				return firebase 
						.auth()
						.createUserWithEmailAndPassword(
							newUser.email,
							newUser.password 
						);
			}
		})
		.then(data => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then(idToken => {
			token = idToken;
			const userCredentials = {
				email: newUser.email,
				password: newUser.password,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				phoneNumber: newUser.phoneNumber,
				username: newUser.username,
				createdAt: new Date().toISOString(),
				userId
			};
			return db 
					.doc(`/users/${newUser.username}`)
					.set(userCredentials)
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch(err => {
			console.error(err);
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'Email already in use' });
			} else {
				return res.status(500).json({ general: 'Something went wrong. Please try again later' });
			}
		});
}