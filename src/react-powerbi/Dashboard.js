/* eslint-disable */

import React from 'react'
import Embedder from './Embedder'

export default function Dashboard(props) {

	const config = {
		accessToken: props.accessToken,
		id: props.id,
		tokenType: props.tokenType,
		type: "dashboard", // not part of IReport
		embedUrl: props.embedUrl // not part of IReport
	}

	return (
		<div>
			<Embedder config={config}/>
		</div>
	)

}
