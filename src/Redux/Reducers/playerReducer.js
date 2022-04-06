const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'gravatarImg':
    return {
      ...state,
      gravatarEmail: action.gravatar,
    };
  case 'name':
    return {
      ...state,
      name: action.name,
    };
  default:
    return state;
  }
};

export default player;
