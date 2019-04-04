/* eslint-disable */

import React from 'react';
import * as pbi from 'powerbi-client'

const powerbi = new pbi.service.Service(
  pbi.factories.hpmFactory,
  pbi.factories.wpmpFactory,
  pbi.factories.routerFactory)

export class Embedder extends React.Component {
  constructor (props) {
    super(props)
    this.component = null
    this.rootElement = null
  }

  componentDidMount () {
    // this.updateState(this.props)
    this.embed(this.props.config)
  }

/*  componentWillReceiveProps (nextProps) {
    this.updateState(nextProps)
  }*/

  componentDidUpdate () {
    if (this.validateConfig(this.state)) {
      // Error handling here
      this.embed(this.props.config)
    }
  }

  componentWillUnmount () {
    powerbi.reset(this.rootElement)
    this.component = null
  }

  embed (config) {
    this.component = powerbi.embed(this.rootElement, config)
    /* if (this.props.onEmbedded) {
      this.props.onEmbedded(this.component)
    }*/
    return this.component
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

  validateConfig (config) {
    // const errors = pbi.models.validateReportLoad(config)
    const errors = undefined

    return (errors === undefined)
  }

  getFilters (report) {
    report.getFilters().then(filters => {
      filters.forEach(coolFilter => console.log(coolFilter))
    })
  }

  removeFilters (report) {
    report.removeFilters()
  }

  setFilters (report) {
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
  render () {
    const dimensions = {
      width: this.props.dimensions.width,
      height: this.props.dimensions.height
    }

    return (

      <div>
        <div className='powerbi-frame' ref={(el) => { this.rootElement = el }} style={dimensions} />
        <button onClick={() => this.getFilters(this.component)}>Get filters</button>
        <button onClick={() => this.removeFilters(this.component)}>Remove filters</button>
        <button onClick={() => this.setFilters(this.component)}>Set filters</button>
      </div>
    )
  }
}
