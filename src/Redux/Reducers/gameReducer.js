const INITIAL_STATE = {
  results: [],
  currentQuestion: 0,
  timer: 30,
  answered: '',
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
  case 'NEXT_QUESTION':
    return {
      ...state,
      currentQuestion: action.payload,
      answered: 'respondendo',
      timer: 30,
    };
  case 'ANSWERED':
    return {
      ...state,
      answered: 'respondido',
    };
  case 'NEW_GAME':
    return {
      results: [],
      currentQuestion: 0,
      timer: 30,
      answered: '',
    };
  default:
    return state;
  }
};

export default game;
