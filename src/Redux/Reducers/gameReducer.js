const INITIAL_STATE = {
  results: [],
  currentQuestion: 0,
  timer: 30,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_GAME_INFO':
    return {
      ...state,
      results: action.payload,
    };
  case 'SET_TIMER':
    return {
      ...state,
      timer: action.payload,
    };
  default:
    return state;
  }
};

export default game;
