/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const { WebcastPushConnection } = require('tiktok-live-connector');

const router = express.Router();
/* router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
*/

const tiktokState = {
	userName: '',
	user: {},
	isConnected: false,
	streamEnd: false,
	messages: [],
	gifts: [],
	gain: 0,
	listGifts: [],
	likes: [],
	totalLikes: 0,
	viewers: 0,
	subsribers: [],
	followers: [],
	shares: [],
	boostGifts: [],
	questionNew: [],
};

const app = express(); // create express app

// add middlewares
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/tiktok', (req, res) => {
	tiktokState.userName = req.body.userName;

	const tiktokLiveConnection = new WebcastPushConnection(tiktokState.userName, {
		processInitialData: false,
		enableExtendedGiftInfo: true,
		enableWebsocketUpgrade: true,
		requestPollingIntervalMs: 2000,
		clientParams: {
			app_language: 'fr-FR',
			device_platform: 'web',
		},
		// requestHeaders: {
		//     "headerName": "headerValue"
		// },
		// websocketHeaders: {
		//     "headerName": "headerValue"
		// },
		// requestOptions: {
		//     timeout: 10000
		// },
		// websocketOptions: {
		//     timeout: 10000
		// }
	});

	tiktokLiveConnection.connect().then((state) => {
		tiktokState.isConnected = true;
		tiktokState.user = state.roomInfo.owner;
		console.info(`Connected to roomId ${state.roomId}`);
	}).catch((err) => {
		console.error('Failed to connect', err);
	});

	tiktokLiveConnection.getAvailableGifts().then((giftList) => {
		giftList.forEach((gift) => {
			tiktokState.listGifts = [
				...tiktokState.listGifts,
				{ id: gift.id, name: gift.name, cost: gift.diamond_count }];
		});
	}).catch((err) => {
		console.error(err);
	});

	tiktokLiveConnection.on('chat', (data) => {
		const newMessage = data;

		tiktokState.messages = [...tiktokState.messages, newMessage];
	});

	tiktokLiveConnection.on('gift', (data) => {
		let gain = 0;
		if (data.giftType === 1 && !data.repeatEnd) {
			// Streak in progress => show only temporary
		} else {
			const arrayGiftSend = tiktokState.listGifts.filter((gift) => gift.id === data.giftId);
			const giftSend = arrayGiftSend[0];

			gain = giftSend.cost * data.repeatCount;

			tiktokState.gifts = [...tiktokState.gifts, data];
		}

		tiktokState.gain += gain;
	});

	tiktokLiveConnection.on('roomUser', (data) => {
		const countViewers = data.viewerCount;

		tiktokState.viewers = countViewers;
	});

	tiktokLiveConnection.on('like', (data) => {
		const countLikes = data.likeCount;
		const newLikes = data;

		tiktokState.totalLikes += countLikes;
		tiktokState.likes = [...tiktokState.likes, newLikes];
	});

	return res.json({ userName: tiktokState.userName });
});

app.get('/tiktok', (req, res) => res.json({ isConnected: tiktokState.isConnected }));
app.get('/user', (req, res) => res.json({ user: tiktokState.user }));
app.get('/messages', (req, res) => res.json({ messages: tiktokState.messages }));
app.get('/gifts', (req, res) => res.json({ gifts: tiktokState.gifts }));
app.get('/gain', (req, res) => res.json({ gain: tiktokState.gain }));
app.get('/likes', (req, res) => res.json({ likes: tiktokState.likes }));
app.get('/viewers', (req, res) => res.json({ viewers: tiktokState.viewers }));
app.get('/totalLikes', (req, res) => res.json({ likes: tiktokState.totalLikes }));
app.get('/newLikes', (req, res) => res.json({ likes: tiktokState.likes }));

app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
module.exports.handler = serverless(app);
