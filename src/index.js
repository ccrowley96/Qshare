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
import Login from './components/login';
import Landing from './components/landing';
import Contact from './components/contact';
import RideNotFound from './components/ride_not_found';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
export const store = createStoreWithMiddleware(reducers);

function checkLogin() {
   var { fb_state } = store.getState();
   return fb_state.loggedIn;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkLogin() === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

// <Route component={FB_Login} />
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute auth={checkLogin} path="/post-ride" component={RidesNew} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/rides/:id" component={RidesShow} render={(props) => ( <RidesShow {...props} key={this.checkJoinLeave} /> )}/>
          <Route path="/index" component={RidesIndex} />
          <Route path="/contact" component={Contact} />
          <Route path="/ride-not-found" component={RideNotFound} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'),
);

store.subscribe(() => { checkLogin(); });
