/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { Avatar, Box } from '@mui/material';
import './index.scss';

export default function Message({ message }) {
	return (
		<div className="message primary">
			<Avatar alt={`@ ${message.nickname}`} src={message.profilePictureUrl} />
			<Box>
				{ message.nickname }
				{' '}
				:
				{' '}
			</Box>
			<Box>{ message.comment }</Box>
		</div>
	);
}
