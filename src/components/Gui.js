import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import ac from '../state/actionCreators';

import sceneSets from '../client/renderer/sceneSets';

class Gui extends React.Component {

  render() {
    return <div>
      {
        this.props.guiComponents.map((Comp, i) => <Comp key={i}/>)
      }
    </div>;
  }
}

const mapState = s => {
  const { currentSceneSetName } = s;
  
  return { 
    guiComponents: currentSceneSetName ? sceneSets[currentSceneSetName].guiComponents : [] 
  };
};
export default connect(mapState)(Gui);
