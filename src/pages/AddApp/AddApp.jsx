import React from 'react';
import Form from '../../components/BusyErrorForm';
import Panel, {
	Heading,
	Footer,
	GroupItem,
	Body,
	Page
} from '../../layouts/Panel';

const Import = {
	schema: {
		repo: {
			title: 'Import Project',
			type: 'Text',
			help: 'Enter the git repo of your project'
		}
	},
	fieldsets: {
		fields: 'repo',
		buttons: [{ action: 'submit', primary: true, label: 'Import' }]
	}
};

const Add = {
	schema: {
		name: {
			title: 'Create An App',
			type: 'Text',
			help: 'Enter the name of your new app',
			validators: ['required', { type: 'max', max: 30 }]
		}
	},
	fieldsets: {
		fields: 'name',
		buttons: [{ action: 'submit', primary: true, label: 'Create' }]
	}
};

export default class AddApp extends React.Component {
	state = { value: {} };

	handleImport = data => {
		fetch('http://localhost:8082/git', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(ret => ret.json())
			.then(value => {
				this.setState({
					value
				});
			});
	};

	render() {
		const { onCreate, addApp } = this.props;
		const { icon, title } = this.state.value;
		return (
			<Page>
				<Form schema={Import} onSubmit={this.handleImport} />
				{icon && (
					<div className="col-sm-offset-2 col-sm-10 btn-group d-flex justify-content-between">
						<strong>
							<i className={`fa fa-icon fa-${icon}`} /> {title}
						</strong>
						<button type="button" className="btn btn-outline-primary">
							Build {title}
							_ios app
						</button>
						<button type="button" className="btn btn-outline-secondary">
							Build {title}
							_android app
						</button>
					</div>
				)}
				<Form
					schema={Add}
					value={this.state.value}
					onSubmit={onCreate}
					{...addApp}
				/>
			</Page>
		);
	}
}
