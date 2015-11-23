import React from 'react';
import Game from './Game.js';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar';
import { connect } from 'react-redux';

class App extends React.Component {
  
  render() {
    return <div>
      <LoadingBar records={this.props.records} />
      <div>
        <strong>Oso</strong> -
      - <Link to='/'>Home</Link> -
      - <Link to='/data/explore'>Explore</Link> -
      - <Link to='/data/create'>Create</Link> -
      - <a href='https://github.com/dherault/Oso' target='_blank'>GitHub</a> -
      - <a href='https://github.com/AquestTechnologies/Aquest' target='_blank'>Aquest</a> -
      - <a href='http://rethinkdb.com/api/javascript/' target='_blank'>RethinkDb</a> -
      - <a href='https://github.com/rackt/react-redux/blob/master/docs/api.md' target='_blank'>react-redux</a> -
      </div>
      
      {
        this.props.children || <Game />
      }
      
    </div>;
  }
}

export default connect(s => ({ records: s.records }))(App);
