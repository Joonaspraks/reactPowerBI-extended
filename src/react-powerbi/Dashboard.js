import React from 'react'
import {Embedder} from "Embedder"

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dimensions: {
        height: props.height,
        width: props.width
      },
      config: {
        accessToken: props.accessToken,
        id: props.id,
        pageView: props.pageView,
        tokenType: props.tokenType,
        type: "dashboard", // not part of IReport
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
