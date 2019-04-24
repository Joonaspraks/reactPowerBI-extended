/* eslint-disable */

import React, {useEffect, useState} from 'react';
import * as pbi from 'powerbi-client'

//Mingi etem viis objekti loomiseks?
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

export function setFilters(filters) {

	component.setFilters(filters)
		.catch(errors => {
			console.log(errors)
		})
}

export function isVisualDefined() {
	return !!component;
}

export function getFilters() {
	if (isVisualDefined())
		console.log(component.getFilters());
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


	/*	function load() {
			return powerBI.load(rootElement, props.config)
		}*/

	// Vajalik, et enne refi püstitamist välja ei kutsutaks.
	//Asendab componentDidMounti
	useEffect(() => {
		validateConfig();
		component = embed();

		component.on('loaded', () => {
			setIsHidden(false);
		})
		// component.bookmarksManager.apply("Bookmark5a5f49bbea1bfb0c241d");
		/*component.on('loaded', () => {
						console.log(component.bookmarksManager.getBookmarks());
						component.bookmarksManager.getBookmarks().then(
							result => result.forEach((bookmark) => {
								console.log(bookmark);
								console.log(props.bookmark.name);
								if (bookmark.displayName === props.bookmark.name) {
									component.bookmarksManager.apply(bookmark.name);
									component.render();
								}
							}));
			console.log(component.bookmarksManager)
			component.getPages().then(pages => {
				pages.forEach(page => {
					if(page.name==="ReportSection"){
						component.render();
						page.setActive();
					}
				})
			});
		});*/
	})
	;

	{/*			<button onClick={() => getFilters(component)}>Get filters</button>
			<button onClick={() => removeFilters(component)}>Remove filters</button>
			<button onClick={() => setFilters(component)}>Set filters</button>
		</div>*/
	}

	return (

		<div hidden={isHidden} className='powerbi-frame'
		     ref={(el) => {
			     rootElement = el
		     }} style={{left: 0, right: 0, top: 0, bottom: 0, position: "absolute"}}
		/>

	)
}
