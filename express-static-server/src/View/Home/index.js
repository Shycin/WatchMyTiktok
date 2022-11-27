import React from 'react';

import Content from '../../Components/Content';
import Header from '../../Components/Header';
import Navigation from '../../Components/Navigation';

import './index.scss';

export default function Home() {
	return (
		<div id="home">
			<div className="ellipsis ellipsis--epsi1" />
			<div className="ellipsis ellipsis--epsi2" />
			<div className="ellipsis ellipsis--epsi3" />
			<div className="ellipsis ellipsis--epsi4" />
			<div className="ellipsis ellipsis--epsi5" />
			<div className="ellipsis ellipsis--epsi6" />
			<div className="ellipsis ellipsis--epsi7" />

			<div id="page">
				<Navigation />
				<MainContent />
			</div>
		</div>
	);
}

function MainContent() {
	return (
		<div id="main">
			<Header />
			<Content />
		</div>
	);
}
