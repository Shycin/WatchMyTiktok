import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import App from './App';
import Home from './View/Home';

export default function RouteList() {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Home />} />
				<Route exact path="/app" element={<App />} />
			</Routes>
		</Router>
	);
}
