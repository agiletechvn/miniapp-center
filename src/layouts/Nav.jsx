'use strict';

import React, { Component } from 'react';
import classNames from 'classnames';
import SideBar from './SideBar';
import Link from './Link';
import Dropdown, { Divider, More } from './Dropdown';
import Progress from '../components/Progress';

const Message = ({
	from = 'John Smith',
	time = 'Yesterday',
	message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...',
	href = '#'
}) => (
	<a href={href}>
		<div>
			<strong>{from}</strong>
			<span className="pull-right text-muted">
				<em>{time}</em>
			</span>
		</div>
		<div>{message}</div>
	</a>
);

export function Menus({ className, children }) {
	return (
		<ul className={classNames(className, 'nav navbar-top-links')}>
			{children}
		</ul>
	);
}

export default class NavContainer extends Component {
	state = { collapse: true };
	static defaultProps = {
		brand: ''
	};

	render() {
		const { collapse } = this.state;

		return (
			<nav
				className="navbar navbar-default navbar-static-top mb-0 p-0"
				role="navigation"
			>
				<div className="d-flex justify-content-between w-100 position-fixed navbar-header p-2">
					<Link className="navbar-brand" to="/app">
						{this.props.brand}
					</Link>
					{this.props.children}
				</div>
			</nav>
		);
	}
}
