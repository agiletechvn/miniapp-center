import React, { Component, PropTypes } from 'react';
import Nav, { Menus } from '../../layouts/Nav';
import SideBar from '../../layouts/SideBar';
import Dropdown, { Divider } from '../../layouts/Dropdown';
import Link from '../../layouts/Link';
import AppsExpand from '../AppsExpand';
import AddApp from '../AddApp';
import Notify from '../Notify';
import logo from '../../img/favicon.ico';

const brand = <span className="electrode-ico">MiniApp Center</span>;

export default class Shell extends Component {
	static propTypes = {
		authorization: PropTypes.shape({
			host: PropTypes.string,
			token: PropTypes.string,
			isFetching: PropTypes.bool,
			isAuthError: PropTypes.bool
		}),
		onLogout: PropTypes.func,
		onSearch: PropTypes.func
	};

	componentDidMount() {
		this.props.onAccountInfo();
	}

	handleSearch = ({ target: { value } }) => this.props.onSearch(value);

	render() {
		const { accountInfo = {} } = this.props;
		const { name } = accountInfo.value || {};
		return (
			<div>
				<Nav brand={brand}>
					<Menus className="navbar-nav">
						<Dropdown type="user" text={name}>
							<Link href="/profile" icon="user">
								User Profile
							</Link>
							<Link href="/sessions" icon="gear">
								Sessions
							</Link>
							<Divider />
							<Link href="/" icon="sign-out" onClick={this.props.onLogout}>
								Logout
							</Link>
						</Dropdown>
					</Menus>
				</Nav>
				<SideBar onSearch={this.handleSearch} value={this.props.open}>
					<AppsExpand />
				</SideBar>
				<Notify parent="shell" className="top-alert" />
				<div id="page-wrapper">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12">
								{this.props.children || <AddApp />}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
