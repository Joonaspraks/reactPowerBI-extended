/* eslint-disable */

import React, {useEffect, useState} from 'react';
import * as pbi from 'powerbi-client'

const powerBI = new pbi.service.Service(
	pbi.factories.hpmFactory,
	pbi.factories.wpmpFactory,
	pbi.factories.routerFactory)

const embedTypes = {
	report: "report",
	dashboard: "dashboard",
	tile: "tile"
};
let component = undefined;

function isVisualDefined() {
	return !!component;
}

export function setFilters(filters) {

	component.setFilters(filters)
		.catch(errors => {
			console.log(errors)
		})
}

export function getFilters() {
	if (isVisualDefined())
		return component.getFilters();
}

export function getPages() {
	if (isVisualDefined())
		return component.getPages();
}

export function setPage(pageName) {
	if (isVisualDefined()) {
		component.getPages().then(pages => {
			pages.forEach(page => {
				if (page.name === pageName) {
					page.setActive();
				}
			})
		});
	}
}

export function getBookMarks() {
	if (isVisualDefined())
		console.log(component.bookmarksManager.getBookmarks())
}

export function removeFilters(report) {
	if (isVisualDefined())
		report.removeFilters()
}

export function showBookMarks() {
	if (isVisualDefined()) {
		component.bookmarksManager.updateSettings({
			bookmarksPaneEnabled: true
		});
	}
}

export default function Embedder(props) {

	const [isHidden, setIsHidden] = useState(props.hideLoadingIcon);
	let rootElement = null;

	const validateConfig = () => {
		let errors;
		if (props.config.type === embedTypes.report) {
			errors = pbi.models.validateReportLoad(props.config);
		} else if (props.config.type === embedTypes.dashboard) {
			errors = pbi.models.validateDashboardLoad(props.config);
		} else if (props.config.type === embedTypes.tile) {
			errors = pbi.models.validateTileLoad(props.config);
		}
		if (errors) throw Error(errors[0].message)
	};

	function embed() {
		return powerBI.embed(rootElement, props.config)
	}

	useEffect(() => {
		validateConfig();
		component = embed();

		component.on('loaded', () => {
			setIsHidden(false);
		})
	})
	;

	return (

		<div hidden={isHidden} className='powerbi-frame'
		     ref={(el) => {
			     rootElement = el
		     }} style={{left: 0, right: 0, top: 0, bottom: 0, position: "absolute"}}
		/>

	)
}
