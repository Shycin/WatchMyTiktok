/* eslint-disable max-len */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './index.scss';

import DashboardIcon from '@mui/icons-material/Dashboard';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { alpha, styled } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';

import {
	Avatar,
	Box,
	Button,
	MenuItem,
	Modal,
	Skeleton,
	TextField,
	Typography,
} from '@mui/material';
import { User, connectTiktokAsync } from '../../store/profile/profileSlice';
import { ReactComponent as Logo } from '../../assets/logo.svg';

export default function Navigation() {
	return (
		<div id="navigation">
			<Logo />
			<Nav />
			<UserContent />
		</div>
	);
}

function Nav() {
	const location = useLocation();
	return (
		<div className="menu">
			<div className={`menu__item ${location.pathname === '/dashboard' ? 'actif' : ''}`}>
				<DashboardIcon />
				Dashboard
			</div>
			<div className={`menu__item ${location.pathname === '/analytics' ? 'actif' : ''}`}>
				<TroubleshootIcon />
				Analytics
			</div>
		</div>
	);
}

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

const modal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function UserContent() {
	const user = useSelector(User);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [tiktokAccount, setTiktokAccount] = React.useState('');
	const [loadTiktokAccount, setLoadTiktokAccount] = React.useState(false);

	const [openModal, setOpenModal] = React.useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();
	React.useEffect(() => {
		if (tiktokAccount !== '' && loadTiktokAccount) { dispatch(connectTiktokAsync({ userName: tiktokAccount })); }

		setLoadTiktokAccount(false);
		setOpenModal(false);
	}, [loadTiktokAccount]);
	console.log(user);
	return (
		<div className="user">
			<Button
				id="user-button"
				aria-controls={open ? 'user-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
				className="user__profile primary"
			>
				{
					user.length
						? (
							<>
								<Avatar alt={user.nickname} src={user.avatar_thumb.url_list[0]} />
								{user.nickname}
							</>
						)
						: (
							<>
								<Skeleton variant="circular" width={40} height={40} />
								Sélectionner un compte
							</>
						)
				}

			</Button>
			<StyledMenu
				id="user-menu"
				MenuListProps={{
					'aria-labelledby': 'user-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={() => { handleClose(); handleOpenModal(); }} disableRipple>
					<DashboardIcon />
					Changer d`utilisateur
				</MenuItem>
				{/* <MenuItem onClick={handleClose} disableRipple>
					<DashboardIcon />
					Duplicate
				</MenuItem>
				<MenuItem onClick={handleClose} disableRipple>
					<DashboardIcon />
					Archive
				</MenuItem>
				<MenuItem onClick={handleClose} disableRipple>
					<DashboardIcon />
					More
				</MenuItem> */}
			</StyledMenu>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modal}>
					<Typography variant="h5" component="h3">Changer de compte à visionner</Typography>
					<br />
					<TextField onChange={(e) => setTiktokAccount(e.target.value)} id="outlined-basic" label="Compte" variant="outlined" />
					<br />
					<Button onClick={() => setLoadTiktokAccount(true)} variant="outlined">Changer de compte</Button>
				</Box>
			</Modal>
		</div>
	);
}
