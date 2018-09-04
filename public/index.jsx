'use strict';
import React from 'react';
import { render } from 'react-dom';
import init, { Root } from '../src/export';

init(
	{
		authorization: {
			hideHost: true,
			token: sessionStorage.token,
			host: sessionStorage.host
		}
	},
	void 0
).then(store => {
	render(
		<Root store={store} basepath="/" />,
		document.getElementById('container')
	);
});
