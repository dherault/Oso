import React from 'react';
import { start, stop } from '../client/client';
import Sidebar from './Sidebar';

export default class Game extends React.Component {
  
  componentDidMount() {
    start();
  }
  
  componentWillUnmount() {
    stop();
  }

  render() {
    return <div>
      <div id='oso_mount_node'></div>
      <Sidebar />
    </div>;
  }
}
