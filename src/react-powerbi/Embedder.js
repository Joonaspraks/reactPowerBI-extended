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

export default function Embedder(props) {

	
	let rootElement = null

	// Vajalik, et enne refi püstitamist välja ei kutsutaks.
	//Asendab componentDidMounti
	useEffect(() => {
		validateConfig();
		component = embed();

		//Asendab componentDidUnMounti
		return function cleanUp() {
			// powerBI.reset(rootElement)
			component = null
		}
	})

	function embed() {
		return powerBI.embed(rootElement, props.config)
	}

	function validateConfig() {
		let errors;
		if (props.config.type === embedTypes.report) {
			errors = pbi.models.validateReportLoad(props.config);
		}
		if (errors) throw Error(errors[0].message)
	}

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
		//<div>
		<div className='powerbi-frame'
		     ref={(el) => {
			     rootElement = el
		     }} style={{left: 0, right: 0, top: 0, bottom: 0, position: "absolute"}}
		/>

	)
}
