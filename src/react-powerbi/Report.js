/* eslint-disable */
import React, {useState} from 'react';
import Embedder from './Embedder';

export default function Report(props) {

	const [display, changeDisplay] = useState(true);
	
	const dimensions = {
		position: "relative"
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
			localeSettings: {
				language: props.language,
				formatLocale: "es"
			}
		}
	};
	
	return (
		<div>
			{display &&
			<Embedder config={config} />
			}
			< button onClick={()=>changeDisplay(!display)}>Remove Report</button>

		</div>

	)

}
