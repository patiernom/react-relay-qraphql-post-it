import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/App/AppContainer';
import EntryContainer from '../components/Entry/EntryContainer';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={EntryContainer} queries={ViewerQuery} />
    <Redirect from='*' to='/' />
  </Route>
);

