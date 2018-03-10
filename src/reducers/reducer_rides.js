import _ from 'lodash';
import { FETCH_RIDES, FETCH_RIDE, DELETE_RIDE, FETCH_RIDE_BY_UID, FETCH_RIDE_BY_PASSENGER_ID } from '../actions';

export default function(state = {}, action) {
  let newState;
  let rides;
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
      rides  = action.payload.data.rides;
      newState = {...state};
      newState.userRides = rides;
      return newState;
    case FETCH_RIDE_BY_PASSENGER_ID:
      rides  = action.payload.data.rides;
      newState = {...state};
      newState.passengerRides = rides;
      return newState;
    case DELETE_RIDE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
