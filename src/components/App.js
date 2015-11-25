import React from 'react';
import Game from './Game.js';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar';
import { connect } from 'react-redux';

class App extends React.Component {
  
  render() {
    
    const s0 = {
      position: 'fixed',
      color: 'black'
    };
    const s1 = {
      color: 'white',
      textDecoration: 'none',
    };
    
    return <div>
      <LoadingBar records={this.props.records} />
      <div style={s0}>
        <strong style={s1}>Oso</strong> -
      - <Link style={s1} to='/'>Home</Link> -
      - <Link style={s1} to='/data/explore'>Explore</Link> -
      - <Link style={s1} to='/data/create'>Create</Link> -
      - <a style={s1} href='https://github.com/dherault/Oso' target='_blank'>GitHub</a> -
      - <a style={s1} href='https://hub.docker.com/r/dherault/oso/builds/' target='_blank'>DockerHub</a> -
      - <a style={s1} href='https://github.com/AquestTechnologies/Aquest' target='_blank'>Aquest</a> -
      - <a style={s1} href='http://rethinkdb.com/api/javascript/' target='_blank'>RethinkDb</a> -
      - <a style={s1} href='http://threejs.org/docs/#Reference' target='_blank'>Three.js</a> -
      - <a style={s1} href='https://github.com/rackt/react-redux/blob/master/docs/api.md' target='_blank'>react-redux</a> -
      </div>
      
      {
        this.props.children || <Game />
      }
      
    </div>;
  }
}

export default connect(s => ({ records: s.records }))(App);
