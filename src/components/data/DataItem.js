import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../../redux/actionCreators';

class DataItem extends React.Component {
  
  componentDidMount() {
  }
  
  render() {
    const { item, params: { table, id } } = this.props;
    
    return <div>
      <h3>{ table + ' - ' + id }</h3>
      <Link to={'/data/explore/' + table}>Back</Link>
      
      { JSON.stringify(item) }
    </div>;
  }
}

const mapState = (state, ownProps) => {
  const { table, id } = ownProps.params;
  
  return { item: state[table][id] };
};

export default connect(mapState)(DataItem);
