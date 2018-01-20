import { combineReducers } from 'redux';
import RidesReducer from './reducer_rides';

const rootReducer = combineReducers({
  rides: RidesReducer
});

export default rootReducer;
