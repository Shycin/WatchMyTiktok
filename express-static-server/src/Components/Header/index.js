/* eslint-disable max-len */
import React from 'react';

import { alpha, styled } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Menu from '@mui/material/Menu';

import {
	Box,
	Button,
	MenuItem,
	// TextField,
	Typography,
} from '@mui/material';
// import { useLocation } from 'react-router-dom';

import { ReactComponent as Don } from '../../assets/don.svg';
import { ReactComponent as Follower } from '../../assets/follower.svg';
import { ReactComponent as Like } from '../../assets/like.svg';

import './index.scss';

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: '5px',
		minWidth: 180,
		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : '#ccc',
		boxShadow:
'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: '#ccc',
				marginRight: '10px',
			},
			'&:active': {
				backgroundColor: alpha(
					'#fff',
					'#ccc',
				),
			},
		},
	},
}));

export default function Header() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div id="header">
			<Box>
				<Typography variant="h4" component="h1">Dashboard</Typography>
				<div>Aperçu et suivi de votre live tiktok</div>
			</Box>
			{/* <Box>
				<TextField id="outlined-basic" label="Rechercher" variant="outlined" />
			</Box> */}
			<Box>
				<Button
					id="objectif-button"
					aria-controls={open ? 'objectif-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					disableElevation
					onClick={handleClick}
					endIcon={<AddBoxIcon />}
					className="user__profile primary"
				>
					Nouveau objectif
				</Button>
				<StyledMenu
					id="objectif-menu"
					MenuListProps={{
						'aria-labelledby': 'objectif-button',
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose} disableRipple>
						<Don className="light-svg" />
						Objectif Dons
					</MenuItem>
					<MenuItem onClick={handleClose} disableRipple>
						<Like className="light-svg" />
						Objectif Likes
					</MenuItem>
					<MenuItem onClick={handleClose} disableRipple>
						<Follower className="light-svg" />
						Objectif Abonnements
					</MenuItem>
				</StyledMenu>
			</Box>
		</div>
	);
}
