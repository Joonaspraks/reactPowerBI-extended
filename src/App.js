import React from 'react';
// import PBIExtended from 'react-powerbi';
import PBIExtended from './ExtendedPBI';
import config from './config.json';

const App = () => (
  <div className="App">
    <PBIExtended
      id={config.reportId}
      tokenType={1}
      embedUrl={config.embedURL}
      accessToken={config.token}
      filterPaneEnabled
      navContentPaneEnabled
      height="720px"
    />
  </div>
);

export default App;
