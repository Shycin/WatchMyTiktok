import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import CardLight from '../CardLight';

import {
	Messages,
	Viewers,
	// Likes,
	Gain,
	TotalLikes,
	messagesTiktokAsync,
	viewersTiktokAsync,
	countLikesTiktokAsync,
	likesTiktokAsync,
	gainTiktokAsync,
	giftsTiktokAsync,
} from '../../store/profile/profileSlice';

import { ReactComponent as Don } from '../../assets/don.svg';
import { ReactComponent as Follower } from '../../assets/follower.svg';
import { ReactComponent as Like } from '../../assets/like.svg';

import './index.scss';
import Message from '../Message';
import Objectif from '../Objectif';

export default function Content() {
	const dispatch = useDispatch();
	const messages = useSelector(Messages);
	const viewers = useSelector(Viewers);
	const gain = useSelector(Gain);
	// const likes = useSelector(Likes);
	const totalLikes = useSelector(TotalLikes);

	React.useEffect(() => {
		const timer = setInterval(() => {
			dispatch(messagesTiktokAsync());
			dispatch(viewersTiktokAsync());
			dispatch(countLikesTiktokAsync());
			dispatch(likesTiktokAsync());
			dispatch(gainTiktokAsync());
			dispatch(giftsTiktokAsync());
		}, 1000);

		return () => clearInterval(timer);
	});

	return (
		<div id="content">
			<Card Icon={Follower} description="Personnes sur le live" value={viewers} />
			<Card Icon={Don} description="Don sur le live" value={gain} />
			<Card Icon={Like} description="Like sur le live" value={totalLikes} />
			<CardLight description="Nouveau abonnements" value="+16" premium />
			<CardLight description="Question pour animer" value="" />
			<Box className="interaction">
				<Box>
					<Typography variant="h5" component="h2" className="primary" mb={1}>Chat</Typography>
					<Box>
						{
							messages ? messages.map((item) => <Message message={item} />) : ''
						}
					</Box>
				</Box>
				<Box>
					<Typography variant="h5" component="h2" className="primary" mb={1}>Objectif</Typography>
					<Box className="grid">
						<Objectif Icon={Don} description="Don sur le live" value="20 / 100" />
						<Objectif Icon={Follower} description="Nouveau abonnées" value="18 / 100" />
						<Objectif Icon={Like} description="Like sur le live" value="2.5K / 5K" />
					</Box>
				</Box>
			</Box>
		</div>
	);
}
