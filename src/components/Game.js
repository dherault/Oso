import React from 'react';
import { start, stop } from '../client/client';
import Object3DList from './Object3DList';

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
      <Object3DList />
    </div>;
  }
}
