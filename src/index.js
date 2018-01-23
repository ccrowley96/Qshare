/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';
import RidesIndex from './components/rides_index';
import RidesNew from './components/rides_new';
import RidesShow from './components/rides_show';
import FB_Login from './components/FacebookLogin/FacebookLogin';
import Profile from './components/profile';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route component={FB_Login} />
        <Switch>
          <Route path="/post-ride" component={RidesNew} />
          <Route path="/profile" component={Profile} />
          <Route path="/rides/:id" component={RidesShow}/>
          <Route path="/" component={RidesIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'),
);
