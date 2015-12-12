import React        from 'react';
import App          from './components/App';
import Game         from './components/Game';
import DataExplorer from './components/data/DataExplorer';
import DataList     from './components/data/DataList';
import DataItem     from './components/data/DataItem';
import DataCreator  from './components/data/DataCreator';
import NotFound     from './components/NotFound';
import { Route, Redirect } from 'react-router';

export default <Route path='/' component={App}> 

  <Route path='~' component={Game} />
  
  <Route path='data/explore' component={DataExplorer} >
    <Route path=':table' component={DataList} />
    <Route path=':table/:id' component={DataItem} />
  </Route>
  
  <Route path='data/create' component={DataCreator} />
  
  <Route path="*" component={NotFound} />
  
  <Redirect from='about'    to='/' />
  <Redirect from='signup'   to='/' />
  <Redirect from='register' to='/' />
  
</Route>;
