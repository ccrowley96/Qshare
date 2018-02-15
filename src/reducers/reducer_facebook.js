import { FB_USER_STATE } from '../actions';

export default function(state = { loggedIn: false}, action) {
  switch (action.type) {
    case FB_USER_STATE:
      let newState = {};
      if (action.payload.loggedIn) {
         newState = {
          ...action.payload
        };
      } else {
        newState = { loggedIn: false };
      }
      return newState;

    default:
      return state;
  }
}
