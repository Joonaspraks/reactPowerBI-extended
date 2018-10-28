import pbi from 'react-powerbi';
import React from 'react';

delete pbi.updateState;

class PBIExtended extends pbi {
  updateState(props) {
    const nextState = Object.assign({}, this.state, props, {
      pageName: this.props.pageName,
      settings: {
        filterPaneEnabled: this.props.filterPaneEnabled,
        layoutType: this.props.mobile ? pbi.models.LayoutType.MobilePortrait : undefined,
      },
    });

    delete nextState.onEmbedded;
    this.setState(nextState);
  }

  render() {
    const dimensions = {
      width: this.props.width,
      height: this.props.height,
    };
    return (
      <div>
        <div className="powerbi-frame" ref={(el) => { this.rootElement = el; }} style={dimensions} />
      </div>
    );
  }
}

// const PBIExtended = () => {
//   delete pbi.render;
//   pbi.updateState = () => (
//     <p>screw you</p>
//   );
// };

export default PBIExtended;
