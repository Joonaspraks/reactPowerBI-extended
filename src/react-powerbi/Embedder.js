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

export default function Embedder(props) {

	let component = null
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

	function setFilters(report) {
		const basicFilter = {
			$schema: "http://powerbi.com/product/schema#basic",
			target: {
				table: "States",
				column: "Region"
			},
			operator: "In",
			values: ["CENTRAL", "EAST"],
			filterType: pbi.models.FilterType.Basic
		}

		const array = [basicFilter]

		report.setFilters(array)
			.catch(errors => {
				console.log(errors)
			})
	}
	{/*			<button onClick={() => getFilters(component)}>Get filters</button>
			<button onClick={() => removeFilters(component)}>Remove filters</button>
			<button onClick={() => setFilters(component)}>Set filters</button>
		</div>*/}

	return (
		//<div>
			<div className='powerbi-frame'
			     ref={(el) => {
				     rootElement = el
			     }} style={{left: 0, right: 0, top: 0, bottom: 0, position: "absolute"}}/>

	)
}
