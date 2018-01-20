import { FETCH_RIDES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RIDES:
      return action.payload.data;
    default:
      return state;
  }
}
