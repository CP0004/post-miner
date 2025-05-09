import {
	FacebookController,
	InstagramController,
	LinkedinController,
	TwitterController
} from './src';

import dotenv from 'dotenv';
dotenv.config();

const environment = {
	facebook: {
		email: process.env.FACEBOOK_EMAIL || '',
		password: process.env.FACEBOOK_PASSWORD || ''
	},
	instagram: {
		email: process.env.INSTAGRAM_EMAIL || '',
		password: process.env.INSTAGRAM_PASSWORD || ''
	},
	twitter: {
		email: process.env.TWITTER_EMAIL || '',
		password: process.env.TWITTER_PASSWORD || ''
	},
	linkedin: {
		email: process.env.LINKEDIN_EMAIL || '',
		password: process.env.LINKEDIN_PASSWORD || ''
	}
};

(async () => {
	const facebookController: FacebookController = new FacebookController(
		'./cookies/cookies-facebook.json',
		{
			email: environment.facebook.email,
			password: environment.facebook.password
		},
		false
	);
	await facebookController.init();

	const instagramController: InstagramController = new InstagramController(
		'./cookies/cookies-instagram.json',
		{
			email: environment.instagram.email,
			password: environment.instagram.password
		},
		false
	);
	await instagramController.init();

	const linkedinController: LinkedinController = new LinkedinController(
		'./cookies/cookies-linkedin.json',
		{
			email: environment.linkedin.email,
			password: environment.linkedin.password
		},
		false
	);
	await linkedinController.init();

	const twitterController: TwitterController = new TwitterController(
		'./cookies/cookies-twitter.json',
		{
			email: environment.twitter.email,
			password: environment.twitter.password
		},
		false
	);
	await twitterController.init();
})();
