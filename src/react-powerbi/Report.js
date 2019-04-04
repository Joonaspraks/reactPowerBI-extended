/* eslint-disable */

import React from 'react';
import { Embedder } from './Embedder';

export default class Report extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dimensions: {
        height: props.height,
        width: props.width
      },
      config: {
        accessToken: props.accessToken,
        bookmark: props.bookmark,
        filters: props.filters,
        id: props.id,
        pageName: props.pageName,
        permissions: props.permissions,
        settings: props.settings,
        tokenType: props.tokenType,
        viewMode: props.viewMode,
        type: "report", // not part of IReport
        embedUrl: props.embedUrl // not part of IReport
      }
    }
  }

  render () {
    return (
      <div>
        <Embedder config={this.state.config} dimensions={this.state.dimensions}/>
      </div>
    )
  }
}
