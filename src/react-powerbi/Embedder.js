/* eslint-disable */

import React, {useEffect} from 'react';
import * as pbi from 'powerbi-client'

//Mingi etem viis objekti loomiseks?
const powerBI = new pbi.service.Service(
	pbi.factories.hpmFactory,
	pbi.factories.wpmpFactory,
	pbi.factories.routerFactory)

const embedTypes = {
	report: "report"
}
let component = null

export function setFilters(filter) {

	const array = [filter]

	component.setFilters(array)
		.catch(errors => {
			console.log(errors)
		})
}

export function setPage(){
	component.getPages().then(pages => {
		pages.forEach(page => {
			if(page.name==="ReportSection"){
				page.setActive();
			}
		})
	});
}

export function getBookMarks() {
	console.log(component.bookmarksManager.getBookmarks())
}

export default function Embedder(props) {

	const validateConfig = () => {
		let errors;
		if (props.config.type === embedTypes.report) {
			errors = pbi.models.validateReportLoad(props.config);
		}
		if (errors) throw Error(errors[0].message)

	}

	function embed() {
		return powerBI.embed(rootElement, props.config)
	}


	function load() {
		return powerBI.load(rootElement, props.config)
	}

	let rootElement = null

	// Vajalik, et enne refi püstitamist välja ei kutsutaks.
	//Asendab componentDidMounti
	useEffect(() => {
		validateConfig();
		component = load();

		// component.bookmarksManager.apply("Bookmark5a5f49bbea1bfb0c241d");
		component.on('loaded', () => {
			/*			console.log(component.bookmarksManager.getBookmarks());
						component.bookmarksManager.getBookmarks().then(
							result => result.forEach((bookmark) => {
								console.log(bookmark);
								console.log(props.bookmark.name);
								if (bookmark.displayName === props.bookmark.name) {
									component.bookmarksManager.apply(bookmark.name);
									component.render();
								}
							}));*/
			console.log(component.bookmarksManager)
			component.getPages().then(pages => {
				pages.forEach(page => {
					if(page.name==="ReportSection"){
						component.render();
						page.setActive();
					}
				})
			});
		});
	})
	;

	function getFilters(report) {
		report.getFilters().then(filters => {
			filters.forEach(coolFilter => console.log(coolFilter))
		})
	}

	function removeFilters(report) {
		report.removeFilters()
	}

	{/*			<button onClick={() => getFilters(component)}>Get filters</button>
			<button onClick={() => removeFilters(component)}>Remove filters</button>
			<button onClick={() => setFilters(component)}>Set filters</button>
		</div>*/
	}

	return (

		<div className='powerbi-frame'
		     ref={(el) => {
			     rootElement = el
		     }} style={{left: 0, right: 0, top: 0, bottom: 0, position: "absolute"}}
		/>

	)
}
