const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'email':
    return {
      ...state,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default player;
