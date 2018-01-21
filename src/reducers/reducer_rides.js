import _ from 'lodash';
import { FETCH_RIDES, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RIDES:
      return action.payload.data;
    case FETCH_POST:
      let { ride } = action.payload.data;
      ride = ride[0];
      const newState =  {...state};
      newState[ride._id] = ride;
      return newState;
    case DELETE_POST:
      return _.omit(state, action.payload);

    default:
      return state;
  }
}
