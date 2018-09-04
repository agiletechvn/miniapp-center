import React from 'react';
import classNames from 'classnames';
import Metrics from './Metrics.less';

export const Options = {
	color: 'primary',
	href: '#',
	className: Metrics.container,
	itemClassName: Metrics.item
};

export const Metric = ({
	count = 0,
	label = Options.label,
	onClick = Options.onClick,
	icon = Options.icon,
	color = Options.color,
	href = Options.href,
	className = Options.itemClassName
}) => {
	return (
		<div className={`col-lg-3 col-md-6 ${className}`}>
			<div className={`panel bg-${color}`}>
				<div className="panel-heading">
					<div className="d-flex justify-content-around">
						<div>
							<i className={`fa fa-${icon} fa-5x`} />
						</div>
						<div className="text-right">
							<div className="huge">{count}</div>
							<div>{label}</div>
						</div>
					</div>
				</div>
				{onClick ? (
					<a onClick={onClick} href={href}>
						<div className="panel-footer">
							<span className="pull-left">View Details</span>
							<span className="pull-right">
								<i className="fa fa-arrow-circle-right" />
							</span>
							<div className="clearfix" />
						</div>
					</a>
				) : null}
			</div>
		</div>
	);
};

function renderMetrics({
	active = 0,
	downloaded = 0,
	failed = 0,
	installed = 0
}) {
	return [
		<Metric
			key="active"
			count={active}
			label="Active"
			icon="comments"
			color="primary"
		/>,
		<Metric
			key="installed"
			count={installed}
			label="Installed"
			icon="thumbs-up"
			color="success"
		/>,
		<Metric
			key="downloaded"
			count={downloaded}
			label="Downloaded"
			icon="cloud-download-alt"
			color="warning"
		/>,
		<Metric
			key="failed"
			count={failed}
			label="Failed"
			icon="meh"
			color="danger"
		/>
	];
}
export default function({
	metrics = {},
	noMetrics = `No Metrics Yet`,
	className = Options.className
}) {
	return (
		<div className={classNames('clearfix row text-white', className)}>
			{!metrics ? <h3>{noMetrics}</h3> : renderMetrics(metrics)}
		</div>
	);
}
