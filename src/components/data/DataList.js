import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../../redux/actionCreators';

class DataList extends React.Component {
  
  componentDidMount() {
    const { dispatch, data, params: { table } } = this.props;
    
    // console.log(ac)
    dispatch(ac.readAll({ table }));
  }
  
  render() {
    const { data, params: { table } } = this.props;
    
    return <div>
      <h3>{ table }</h3>
      <Link to='/data/explore'>Back</Link>
      { JSON.stringify(data) }
    </div>;
  }
}

const mapState = (state, ownProps) => {
  const x = ownProps.params.table;
  
  return { data: state[x] };
};

export default connect(mapState)(DataList);
