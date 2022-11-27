/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import { Box } from '@mui/material';
import React from 'react';

import { ReactComponent as Premium } from '../../assets/flash.svg';
import { ReactComponent as Upgrade } from '../../assets/up.svg';
import { ReactComponent as Downgrade } from '../../assets/down.svg';

import './index.scss';

function intToString(num) {
	num = num.toString().replace(/[^0-9.]/g, '');
	if (num < 1000) {
		return num;
	}
	const si = [
		{ v: 1E3, s: 'K' },
		{ v: 1E6, s: 'M' },
		{ v: 1E9, s: 'B' },
		{ v: 1E12, s: 'T' },
		{ v: 1E15, s: 'P' },
		{ v: 1E18, s: 'E' },
	];
	let index;
	for (index = si.length - 1; index > 0; index--) {
		if (num >= si[index].v) {
			break;
		}
	}
	return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
}

export default function Card({
	Icon, description, value, valueUpdated = 0, premium = false,
}) {
	return (
		<div className="card">
			<div className="content">
				<Box className="content__header">
					<Icon className="medium-svg" />
					<Box className={`content__header__premium ${!premium ? 'blur' : ''} `}>
						<Box className="primary">
							{
								valueUpdated ? <Upgrade /> : <Downgrade />
							}
							{ Math.abs(valueUpdated) }
							%
						</Box>
						<Box className="secondary">
							Dernier live
						</Box>
						<Box className="icon_premium">
							<Premium />
						</Box>
					</Box>
				</Box>
				<Box className="secondary">
					{ description }
				</Box>
				<Box className="primary bold">
					{ intToString(value) }
				</Box>
			</div>
		</div>
	);
}
