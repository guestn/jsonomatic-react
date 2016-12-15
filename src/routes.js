'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import SecondaryPage from './components/SecondaryPage';
import SettingsPage from './components/SettingsPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/settings" component={SettingsPage}/>
    <Route path="/:id" component={SecondaryPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;

