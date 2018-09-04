import Shell from './Shell';
import { connect } from 'react-redux';
import { filter } from '../AppsExpand/actions';
import { navigate } from './actions';
import { logout } from '../Login/actions';

import { getAccountInfo } from '../Profile/actions';

const mapStateToProps = (
	state = { authorization: { isFetching: true } },
	props
) => {
	return {
		...state,
		params: props.params,
		open: state.sidebar,
		isFetching: state.authorization.isFetching
	};
};
const deleteToken = () => delete localStorage.token;

const mapDispatchToProps = dispatch => ({
	onSearch(value) {
		dispatch(filter(value));
	},
	onLogout() {
		dispatch(logout())
			.then(deleteToken)
			.then(_ => dispatch(navigate('/login')));
	},
	onAccountInfo() {
		const { host, token } = this.authorization;
		dispatch(getAccountInfo(host, token));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Shell);
