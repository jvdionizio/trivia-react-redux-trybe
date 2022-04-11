export function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

function getToken(json) {
  return { type: 'GET_TOKEN', payload: json.token };
}

function getGameInfo(json) {
  return { type: 'GET_GAME_INFO', payload: json.results };
}

export function fetchToken(link) {
  return (dispatch) => (
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => dispatch(getToken(json)))
      .then((result) => fetch(`${link}&token=${result.payload}`))
      .then((response) => response.json())
      .then((json) => dispatch(getGameInfo(json)))
      .catch((error) => dispatch(failedRequest(error))));
}

export const gravatarAction = (gravatar) => ({
  type: 'gravatarImg',
  gravatar,
});

export const nameAction = (name) => ({
  type: 'name',
  name,
});

export function setTimer(timer) {
  return { type: 'SET_TIMER', payload: timer };
}

export function addScore(score) {
  return { type: 'ADD_SCORE', payload: score };
}

export function nextQuestion(question) {
  return { type: 'NEXT_QUESTION', payload: question };
}

export function answerQuestion() {
  return { type: 'ANSWERED' };
}

export function addQtdCorrectAnswers(answer) {
  return { type: 'ADD_CORRECT_ANSWER', payload: answer };
}

export function newGame() {
  return { type: 'NEW_GAME' };
}

export function addSettings(value) {
  return { type: 'ADD_SETTINGS', payload: value };
}
