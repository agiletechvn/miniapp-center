import React, { Component } from 'react';
import appPageDispatchToProps from './dispatch';
import boundDispatched from '../../util/boundDispatched';
import { connect } from 'react-redux';
import AppPage from './AppPage';
import Busy from '../../components/BusyIndicator';

const mapStateToProps = (state, props) => {
	const { selectedApp, authorization, collaborator } = state;
	const {
		params: { name, deployment }
	} = props;
	return {
		authorization,
		collaborators: collaborator.value,
		...selectedApp,
		name,
		deployment
	};
};

class ConnectAppPageInner extends Component {
	componentDidMount() {
		this.props.fetch(this.props);
	}

	componentWillReceiveProps(props) {
		if (props.name != this.props.name || props.isStale) {
			this.props.fetch(props);
		}
	}

	render() {
		const { fetch, authorization, params, isFetching, ...rest } = this.props;
		return (
			<Busy isBusy={isFetching}>
				<AppPage {...rest} />
			</Busy>
		);
	}
}

export default connect(
	mapStateToProps,
	appPageDispatchToProps,
	boundDispatched
)(ConnectAppPageInner);
