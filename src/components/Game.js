import React from 'react';
import ac from '../state/actionCreators';
import { start, stop } from '../client/client.js';

export default class Game extends React.Component {
  
  componentDidMount() {
    start();
  }
  
  componentWillUnmount() {
    stop();
  }

  render() {
    return (<div id='oso_mount_node'></div>);
  }
}
