/* eslint-disable */

import React, {useEffect} from 'react';
import * as pbi from 'powerbi-client'

const powerbi = new pbi.service.Service(
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
			powerbi.reset(rootElement)
			component = null
		}
	})

	/*  componentWillReceiveProps (nextProps) {
		this.updateState(nextProps)
	  }*/

// Kas on vajadust component updateile? Kas filtrid ei tööta ilma?
	/*  componentDidUpdate () {
		if (this.validateConfig(this.state)) {
		  // Error handling here
		  this.embed(this.props.config)
		}
	  }*/

	function embed() {
		return powerbi.embed(rootElement, props.config)
		/* if (this.props.onEmbedded) {
		  this.props.onEmbedded(this.component)
		}*/
	}

	/* updateState (props) {
	  const nextState = Object.assign({}, this.state, props, {
		pageName: this.props.pageName,
		settings: {
		  filterPaneEnabled: this.props.filterPaneEnabled,
		  navContentPaneEnabled: this.props.navContentPaneEnabled,
		  layoutType: this.props.mobile ? pbi.models.LayoutType.MobilePortrait : undefined
		},
		type: this.props.embedType ? this.props.embedType : 'report'
	  })
  
	  /!**
	   * This property must be removed from the state object so that it doesn't get used in the embedConfig.
	   * This would be passed to `powerbi.embed(element, embedConfig)` and attempted to be sent over postMessage;
	   * however, functions cannot be cloned and it will fail.
	   *!/
  
	  delete nextState.onEmbedded
	  this.setState(nextState)
	}*/

	function validateConfig() {
		let errors;
		if (props.config.type === embedTypes.report) {
			errors = pbi.models.validateReportLoad(props.config);
		}
		// const errors = undefined
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

	const dimensions = {
		width: props.dimensions.width,
		height: props.dimensions.height
	}

	return (
		<div>
			<div className='powerbi-frame'
			     ref={(el) => {
				     rootElement = el
			     }} style={dimensions}/>
			<button onClick={() => getFilters(component)}>Get filters</button>
			<button onClick={() => removeFilters(component)}>Remove filters</button>
			<button onClick={() => setFilters(component)}>Set filters</button>
		</div>
	)
}
