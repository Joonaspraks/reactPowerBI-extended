import React from 'react';
// import {PowerbiEmbedded}/* , { IFilter } */ from 'react-powerbi';
import { Report } from './react-powerbi/index';
import config from './config.json';

function App() {
  return (
    <div className="App">
      <Report
        id={config.reportId}
        embedUrl={config.embedURL}
        accessToken={config.token}
        filterPaneEnabled={false}
        navContentPaneEnabled={false}
        embedType="report"
        height="900px"
        tokenType={1}
      />
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
