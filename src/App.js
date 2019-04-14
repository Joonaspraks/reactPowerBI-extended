/* eslint-disable */
import React, {useState} from 'react';
// import {PowerbiEmbedded}/* , { IFilter } */ from 'react-powerbi';
import {Report, setFilters, getBookMarks, setPage} from './react-powerbi/index';
import config from './config.json';
import * as pbi from 'powerbi-client'

function App() {
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
				<Report
					id={config.reportId} // Unnecessary?
					embedUrl={config.embedURL}
					accessToken={config.token}
					bookmark={{name:"DemoReportBookMark"}}
					filterPaneEnabled={true} // typo error-handling?
					navContentPaneEnabled={false}
					tokenType={1} // Good error-handling here
					// filters={[filter]}
					language={'et'}
					visible={true}
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
			<button onClick={getBookMarks}>Get all bookmarks!</button>
			<button onClick={setPage}>Set new page</button>
		</div>
	);
}

export default App;

/* let token = '';

let url = 'https://login.windows.net/common/oauth2/token';
fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  headers: {
    'Content-Type': 'application/json',
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  body: JSON.stringify({
    client_id: '4c048f3c-4568-44d8-9918-acd503103cc9',
    grant_type: 'password',
    resource: 'https://analysis.windows.net/powerbi/api',
    username: 'joonas.praks@profitsoftware.com',
    password: 'Evakorter1502',
  }), // body data type must match "Content-Type" header
}).then((response) => {
  url = 'https://api.powerbi.com/v1.0/myorg/groups/d57985a4-319c-4708-a658-14cf9e5e0bd6/reports/42787bd9-140f-44ed-b0b2-9f3b4279429f/GenerateToken';
  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${response.access_token}`,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      accessLevel: 'View',
    }), // body data type must match "Content-Type" header
  }).then((response2) => {
    ({ token } = response2);
  });
}); */
