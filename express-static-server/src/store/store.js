/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import profile from './profile/profileSlice';

export const store = configureStore({
	reducer: {
		profile,
	},
});
