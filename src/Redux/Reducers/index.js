import { combineReducers } from 'redux';
import game from './gameReducer';
import player from './playerReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({
  token,
  player,
  game,
});

export default rootReducer;
