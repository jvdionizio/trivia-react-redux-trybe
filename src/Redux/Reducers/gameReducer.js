const INITIAL_STATE = {
  results: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_GAME_INFO':
    return {
      results: action.payload,
    };
  default:
    return state;
  }
};

export default game;
