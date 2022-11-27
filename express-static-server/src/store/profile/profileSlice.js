/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
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

export const UserName = (state) => state.profile.userName;
export const User = (state) => state.profile.user;
export const IsConnected = (state) => state.profile.isConnected;
export const Error = (state) => state.profile.errorInitProfile;
export const StreamEnd = (state) => state.profile.streamEnd;
export const Messages = (state) => state.profile.messages;
export const Gifts = (state) => state.profile.gifts;
export const Gain = (state) => state.profile.gain;
export const ListGifts = (state) => state.profile.listGifts;
export const Likes = (state) => state.profile.likes;
export const TotalLikes = (state) => state.profile.totalLikes;
export const Viewers = (state) => state.profile.viewers;
export const Subsribers = (state) => state.profile.subsribers;
export const Followers = (state) => state.profile.followers;
export const Shares = (state) => state.profile.shares;
export const BoostGifts = (state) => state.profile.boostGifts;
export const QuestionNew = (state) => state.profile.questionNew;

export const connectTiktokAsync = createAsyncThunk(
	'tiktok/connect',
	async (data) => axios.post('/tiktok', { userName: data.userName }),
);

export const tiktokAsync = createAsyncThunk(
	'tiktok/getConnect',
	async () => axios.get('/tiktok'),
);

export const userTiktokAsync = createAsyncThunk(
	'tiktok/getUser',
	async () => axios.get('/user'),
);

export const viewersTiktokAsync = createAsyncThunk(
	'tiktok/getViews',
	async () => axios.get('/viewers'),
);

export const messagesTiktokAsync = createAsyncThunk(
	'tiktok/getMessages',
	async () => axios.get('/messages'),
);

export const giftsTiktokAsync = createAsyncThunk(
	'tiktok/getGifts',
	async () => axios.get('/gifts'),
);

export const gainTiktokAsync = createAsyncThunk(
	'tiktok/getGain',
	async () => axios.get('/gain'),
);

export const countLikesTiktokAsync = createAsyncThunk(
	'tiktok/getCountLikes',
	async () => axios.get('/totalLikes'),
);

export const likesTiktokAsync = createAsyncThunk(
	'tiktok/getLikes',
	async () => axios.get('/newLikes'),
);

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(connectTiktokAsync.pending, (state) => {})
			.addCase(connectTiktokAsync.fulfilled, (state, action) => {
				console.log(state, action);
			})
			.addCase(connectTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(tiktokAsync.pending, (state) => {})
			.addCase(tiktokAsync.fulfilled, (state, action) => {
				console.log(state, action);
			})
			.addCase(tiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(userTiktokAsync.pending, (state) => {})
			.addCase(userTiktokAsync.fulfilled, (state, action) => {
				const { user } = action.payload.data;

				state.user = user;
			})
			.addCase(userTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(viewersTiktokAsync.pending, (state) => {})
			.addCase(viewersTiktokAsync.fulfilled, (state, action) => {
				const { viewers } = action.payload.data;

				state.viewers = viewers;
			})
			.addCase(viewersTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(messagesTiktokAsync.pending, (state) => {})
			.addCase(messagesTiktokAsync.fulfilled, (state, action) => {
				const { messages } = action.payload.data;
				/* const currentMessages = JSON.parse(JSON.stringify(state.messages));

				if (currentMessages.length && currentMessages[currentMessages.length - 1]) {
					const lastTimeUpdated = currentMessages[currentMessages.length - 1].createTime;
					const newMessages = messages.filter((each) => each.createTime > lastTimeUpdated);

					console.log(newMessages);
					state.messages = [...currentMessages, ...newMessages];
				} else if (currentMessages.length === 0) {
					console.log(messages);
					state.messages = [...currentMessages, ...messages];
				} */
				messages.reverse();
				state.messages = [...messages];
			})
			.addCase(messagesTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(giftsTiktokAsync.pending, (state) => {})
			.addCase(giftsTiktokAsync.fulfilled, (state, action) => {
				// console.log(state, action);
			})
			.addCase(giftsTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(countLikesTiktokAsync.pending, (state) => {})
			.addCase(countLikesTiktokAsync.fulfilled, (state, action) => {
				const { likes } = action.payload.data;
				state.totalLikes = likes;
			})
			.addCase(countLikesTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(likesTiktokAsync.pending, (state) => {})
			.addCase(likesTiktokAsync.fulfilled, (state, action) => {
				const { likes } = action.payload.data;
				state.likes = [...state.likes, likes];
			})
			.addCase(likesTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			})

			.addCase(gainTiktokAsync.pending, (state) => {})
			.addCase(gainTiktokAsync.fulfilled, (state, action) => {
				const { gain } = action.payload.data;
				state.gain = gain;
			})
			.addCase(gainTiktokAsync.rejected, (state, action) => {
				console.log(state, action);
			});
	},
});

export default profileSlice.reducer;
