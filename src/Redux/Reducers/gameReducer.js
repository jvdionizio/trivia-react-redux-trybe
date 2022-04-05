const INITIAL_STATE = {
  results: [],
  currentQuestion: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_GAME_INFO':
    return {
      ...state,
      results: action.payload,
    };
  default:
    return state;
  }
};

export default game;
