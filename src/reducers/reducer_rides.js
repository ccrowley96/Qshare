import _ from 'lodash';
import { FETCH_RIDES, FETCH_RIDE, DELETE_RIDE, FETCH_RIDE_BY_UID } from '../actions';

export default function(state = {}, action) {
  let newState;
  switch (action.type) {
    case FETCH_RIDES:
      return action.payload.data;
    case FETCH_RIDE:
      let { ride } = action.payload.data;
      if(ride.length > 0){
        ride = ride[0];
        newState =  {...state, RIDE_NOT_FOUND : false};
        newState[ride._id] = ride;
        return newState;
      } else {
        newState =  {...state, RIDE_NOT_FOUND : true};
        return newState;
      }
    case FETCH_RIDE_BY_UID:
      const { rides } = action.payload.data;
      newState = {...state};
      newState.userRides = rides;
      return newState;
    case DELETE_RIDE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
