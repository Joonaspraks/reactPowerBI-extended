/* eslint-disable */
import React from 'react';
import Embedder from './Embedder';

export default function Report(props) {

	const dimensions = {
		height: props.height,
		width: props.width
	};

	const config = {
		accessToken: props.accessToken,
		bookmark: props.bookmark,
		filters: props.filters,
		id: props.id,
		pageName: props.pageName,
		permissions: props.permissions,
		tokenType: props.tokenType,
		viewMode: props.viewMode,
		type: "report", // not part of IReport
		embedUrl: props.embedUrl, // not part of IReport
		settings: {
			filterPaneEnabled: props.filterPaneEnabled,
			navContentPaneEnabled: props.navContentPaneEnabled,
			// layoutType: this.props.mobile ? pbi.models.LayoutType.MobilePortrait : undefined
		}
	};

	/*	function throwError(errors){
			throw errors[0].message
		}*/

	return (
		<div>
			<Embedder config={config} dimensions={dimensions}/>
		</div>
		
	)

}
