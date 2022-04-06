export function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

function getToken(json) {
  return { type: 'GET_TOKEN', payload: json.token };
}

function getGameInfo(json) {
  return { type: 'GET_GAME_INFO', payload: json.results };
}

export function fetchToken() {
  return (dispatch) => (
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => dispatch(getToken(json)))
      .then((result) => fetch(`https://opentdb.com/api.php?amount=5&token=${result.payload}`))
      .then((response) => response.json())
      .then((json) => dispatch(getGameInfo(json)))
      .catch((error) => dispatch(failedRequest(error))));
}

export const emailAction = (email) => ({
  type: 'email',
  email,
});
