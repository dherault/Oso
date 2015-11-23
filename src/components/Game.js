import React from 'react';
import ac from '../state/actionCreators';
import loadGame from '../client/client.js';

export default class Game extends React.Component {
  
  componentDidMount() {
    loadGame();
  }

  render() {
    return (<div id='oso_mount_node'></div>);
  }
}
