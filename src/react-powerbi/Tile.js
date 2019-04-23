/* eslint-disable */

import React from 'react'
import Embedder from './Embedder'

export default function Tile(props) {

	const config = {
		accessToken: props.accessToken,
		id: props.id,
		tokenType: props.tokenType,
		type: "tile", // not part of IReport
		embedUrl: props.embedUrl, // not part of IReport
		dashboardId: props.dashboardId
	}

	return (
		<div>
			<Embedder config={config}/>
		</div>
	)

}
