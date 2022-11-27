/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import { Box } from '@mui/material';
import React from 'react';

import { ReactComponent as Premium } from '../../assets/flash.svg';

import './index.scss';

export default function Objectif({
	Icon, description, value,
}) {
	return (
		<div className="objectif">
			<div className="content">
				<Icon className="medium-svg" />
				<Box>
					<Box className="secondary">
						{ description }
					</Box>
					<Box className="primary bold">
						{ value }
					</Box>
				</Box>
			</div>
		</div>
	);
}
