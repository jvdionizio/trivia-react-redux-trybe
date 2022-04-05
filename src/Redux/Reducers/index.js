import { combineReducers } from 'redux';
import token from './tokenReducer';
import player from './playerReducer';

const rootReducer = combineReducers({
  token,
  player,
});

export default rootReducer;
