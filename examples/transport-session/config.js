var jwt = require('jsonwebtoken');

// sign in with apple
// https://medium.com/techulus/how-to-setup-sign-in-with-apple-9e142ce498d4
const getAppleClientSecret = () => {
	// sign with RSA SHA256
	const privateKey = process.env.STARTERKIT_APPLE_PRIVATE_KEY;
	const headers = {
		kid: process.env.STARTERKIT_APPLE_KEY_ID,
		typ: undefined
	}
	const claims = {
		'iss': process.env.STARTERKIT_APPLE_TEAM_ID,
		'aud': 'https://appleid.apple.com',
		'sub': process.env.STARTERKIT_APPLE_CLIENT_ID,
	}
	token = jwt.sign(claims, privateKey, {
		algorithm: 'ES256',
		header: headers,
		expiresIn: '180d'
	});
	return token
}

module.exports = {
	"defaults": {
		"origin": "https://api.tldr.cards",
		"transport": "session"
	},
	"google": {
		"callback": "/hello",
		"key": process.env.STARTERKIT_GOOGLE_KEY,
		"secret": process.env.STARTERKIT_GOOGLE_SECRET,

		"scope": [
			"openid"
		]
	},
	"apple": {
		"callback": "/hello",
		"key": process.env.STARTERKIT_APPLE_CLIENT_ID,
		"secret": getAppleClientSecret(),
		"custom_params": {
			"response_type": "code id_token",
			"response_mode": "form_post"
		}
	}
}
