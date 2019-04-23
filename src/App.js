/* eslint-disable */
import React, {useState} from 'react';
// import {PowerbiEmbedded}/* , { IFilter } */ from 'react-powerbi';
import {Report, Dashboard, Tile, setFilters, getBookMarks, setPage, showBookMarks, getFilters} from './react-powerbi/index';
import configReport from './configReport.json';
import configDashboard from './configDashboard.json';
import configDashboardDemo from './configDashboardDemo.json';
import configTileDemo from './configTileDemo.json';
import configTile from './configTile.json';
import * as pbi from 'powerbi-client'

function App() {
	const [loaded, isLoaded] = useState(false);
	const filter = {
		$schema: "http://powerbi.com/product/schema#basic",
		target: {
			table: "States",
			column: "Region"
		},
		operator: "In",
		values: ["CENTRAL", "EAST"],
		filterType: 1,
	};
	return (
		<div>
			<div className="App" style={{width: "1600px", height: "900px", position: "relative"}}>
				{/*<Report
					id={configReport.id} // Unnecessary?
					embedUrl={configReport.embedURL}
					// pageName={"ReportSection"}
					accessToken={configReport.token}
					bookmark={{name:"DemoReportBookMark"}}
					filterPaneEnabled={true} // typo error-handling?
					navContentPaneEnabled={false}
					tokenType={1} // Good error-handling here
					bookmarksPaneEnabled={true}
					// filters={[filter]}
					language={'et'}
					visible={true}
					hideLoadingIcon={true}
				/>*/}
{/*				<Dashboard
					id={configDashboardDemo.id} // Unnecessary?
					embedUrl={configDashboardDemo.embedURL}
					// pageName={"ReportSection"}
					accessToken={configDashboardDemo.token}
					tokenType={1} // Good error-handling here
				/>*/}
				<Tile
					id={configTile.id} // Unnecessary?
					embedUrl={configTile.embedURL}
					// pageName={"ReportSection"}
					accessToken={configTile.token}
					tokenType={1} // Good error-handling here
					dashboardId={configTile.dashboardId}
				/>
			</div>
			{/*Selline lähenemine paneb komponendi uuesti renderdama*/}
			<button onClick={() => setFilters({
				$schema: "http://powerbi.com/product/schema#basic",
				target: {
					table: "States",
					column: "Region"
				},
				operator: "In",
				values: ["EAST"],
				filterType: 1
			})}>Change Filter</button>
			<button onClick={getFilters}>Get all filters!</button>
			<button onClick={getBookMarks}>Get all bookmarks!</button>
			<button onClick={()=>setPage("ReportSection")}>Set new page</button>
			<button onClick={showBookMarks}>Show bookmark pane</button>
		</div>
	);
}

export default App;


