/* eslint-disable */
import React, {useState} from 'react';
import Embedder from './Embedder';

export default function Report(props) {

	const [display, changeDisplay] = useState(true);
	
	const dimensions = {
		position: "relative"
	};

	const bookmark = props.bookmark;
	const hideLoadingIcon = props.hideLoadingIcon;
	const config = {
		accessToken: props.accessToken,
		// bookmark: props.bookmark,
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
			bookmarksPaneEnabled: props.bookmarksPaneEnabled,
			// layoutType: this.props.mobile ? pbi.models.LayoutType.MobilePortrait : undefined
			localeSettings: {
				language: props.language,
				formatLocale: "es"
			},
			visualSettings: {
				visualHeaders: [
					{
						settings: {
							visible: props.visible
						}
						/* No selector - Hide visual header for all the visuals in the report */
					}
				]
			}
		}
	};
	
	return (
		<div>
			{display &&
			<Embedder config={config} bookmark={bookmark} hideLoadingIcon={hideLoadingIcon} />
			}
			< button onClick={()=>changeDisplay(!display)}>Remove Report</button>

		</div>

	)

}
