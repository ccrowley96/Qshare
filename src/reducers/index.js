import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import RidesReducer from './reducer_rides';
import FB_Reducer from './reducer_facebook';

const rootReducer = combineReducers({
  rides: RidesReducer,
  loggedIn: FB_Reducer,
  form: formReducer
});

export default rootReducer;
