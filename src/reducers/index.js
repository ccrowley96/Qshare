import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import RidesReducer from './reducer_rides';

const rootReducer = combineReducers({
  rides: RidesReducer,
  form: formReducer
});


export default rootReducer;
