import { FB_LOGIN, FB_LOGOUT } from '../actions';

export default function(state = false, action) {
  switch (action.type) {
    case FB_LOGIN:
      console.log(`Login State Changing: ${action.payload}`);
      return action.payload;
    default:
      return state;
  }
}
